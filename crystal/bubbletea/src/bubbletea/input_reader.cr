module BubbleTea
  class InputReader
    @input : IO
    @mode : InputMode
    @in_bracketed_paste : Bool
    @paste_buffer : String

    def initialize(@input : IO, @mode : InputMode)
      @in_bracketed_paste = false
      @paste_buffer = ""
    end

    def each_message(&block : Msg ->)
      case @mode
      when InputMode::Line
        read_lines { |msg| yield msg }
      when InputMode::Key
        read_keys { |msg| yield msg }
      end
    end

    private def read_lines(&block : Msg ->)
      while (line = @input.gets)
        yield UserInputMessage.new(line)
      end
    end

    private def read_keys(&block : Msg ->)
      while (byte = read_byte_or_nil)
        if @in_bracketed_paste
          handle_paste_byte(byte) { |msg| yield msg }
          next
        end

        case byte
        when 3_u8
          yield KeyMessage.new(KeyType::CtrlC, raw: "\u0003")
        when 4_u8
          yield KeyMessage.new(KeyType::CtrlD, raw: "\u0004")
        when 9_u8
          yield KeyMessage.new(KeyType::Tab, raw: "\t")
        when 13_u8, 10_u8
          yield KeyMessage.new(KeyType::Enter, raw: "\n")
        when 32_u8
          yield KeyMessage.new(KeyType::Space, raw: " ")
        when 127_u8
          yield KeyMessage.new(KeyType::Backspace, raw: "\u007f")
        when 27_u8
          parse_escape_sequence { |msg| yield msg }
        when 1_u8..26_u8
          ctrl_msg = ctrl_key_message(byte)
          if ctrl_msg
            yield ctrl_msg
          else
            raw = String.build { |str| str.write_byte(byte) }
            yield KeyMessage.new(KeyType::Unknown, raw: raw)
          end
        else
          rune = String.build { |str| str.write_byte(byte) }
          yield KeyMessage.new(KeyType::Rune, rune: rune, raw: rune)
        end
      end
    end

    private def parse_escape_sequence(&block : Msg ->)
      second = read_byte_or_nil
      unless second
        yield KeyMessage.new(KeyType::Escape, raw: "\e")
        return
      end

      if second == 91_u8
        parse_csi_sequence { |msg| yield msg }
        return
      end

      if second == 79_u8
        parse_ss3_sequence { |msg| yield msg }
        return
      end

      alt_message = alt_prefixed_message(second)
      if alt_message
        yield alt_message
      else
        yield KeyMessage.new(KeyType::Escape, raw: "\e")
        trailing = String.build { |str| str.write_byte(second) }
        yield KeyMessage.new(KeyType::Rune, rune: trailing, raw: trailing)
      end
    end

    private def parse_csi_sequence(&block : Msg ->)
      csi = read_csi
      unless csi
        yield KeyMessage.new(KeyType::Escape, raw: "\e[")
        return
      end

      raw = "\e[#{csi}"
      if mouse = parse_mouse_sgr(csi, raw)
        yield mouse
        return
      end

      final = csi[-1]
      params = csi.size > 1 ? csi[0...-1] : ""

      case final
      when 'A', 'B', 'C', 'D', 'H', 'F'
        key_type = case final
                   when 'A' then KeyType::Up
                   when 'B' then KeyType::Down
                   when 'C' then KeyType::Right
                   when 'D' then KeyType::Left
                   when 'H' then KeyType::Home
                   else          KeyType::End
                   end
        shift, alt, ctrl = parse_modifiers(params)
        yield KeyMessage.new(key_type, shift: shift, alt: alt, ctrl: ctrl, raw: raw)
      when 'P', 'Q', 'R', 'S'
        key_type = case final
                   when 'P' then KeyType::F1
                   when 'Q' then KeyType::F2
                   when 'R' then KeyType::F3
                   else          KeyType::F4
                   end
        shift, alt, ctrl = parse_modifiers(params)
        yield KeyMessage.new(key_type, shift: shift, alt: alt, ctrl: ctrl, raw: raw)
      when 'I'
        yield FocusMessage.new
      when 'O'
        yield BlurMessage.new
      when '~'
        code, shift, alt, ctrl = parse_tilde_code_and_mods(params)
        case code
        when 200
          @in_bracketed_paste = true
          @paste_buffer = ""
          yield PasteStartMessage.new
        when 201
          # End marker without a start: ignore.
        else
          if key_type = tilde_key_type(code)
            yield KeyMessage.new(key_type, shift: shift, alt: alt, ctrl: ctrl, raw: raw)
          else
            yield KeyMessage.new(KeyType::Unknown, raw: raw)
          end
        end
      else
        yield KeyMessage.new(KeyType::Unknown, raw: raw)
      end
    end

    private def parse_ss3_sequence(&block : Msg ->)
      third = read_byte_or_nil
      unless third
        yield KeyMessage.new(KeyType::Escape, raw: "\eO")
        return
      end

      raw = String.build do |str|
        str << "\eO"
        str.write_byte(third)
      end

      case third
      when 80_u8
        yield KeyMessage.new(KeyType::F1, raw: raw)
      when 81_u8
        yield KeyMessage.new(KeyType::F2, raw: raw)
      when 82_u8
        yield KeyMessage.new(KeyType::F3, raw: raw)
      when 83_u8
        yield KeyMessage.new(KeyType::F4, raw: raw)
      when 72_u8
        yield KeyMessage.new(KeyType::Home, raw: raw)
      when 70_u8
        yield KeyMessage.new(KeyType::End, raw: raw)
      else
        yield KeyMessage.new(KeyType::Unknown, raw: raw)
      end
    end

    private def handle_paste_byte(byte : UInt8, &block : Msg ->)
      if byte != 27_u8
        @paste_buffer += String.build { |str| str.write_byte(byte) }
        return
      end

      second = read_byte_or_nil
      unless second
        @paste_buffer += "\e"
        return
      end

      if second == 91_u8
        csi = read_csi
        unless csi
          @paste_buffer += "\e["
          return
        end

        if csi == "201~"
          yield PasteEndMessage.new
          yield PasteMessage.new(@paste_buffer)
          @paste_buffer = ""
          @in_bracketed_paste = false
          return
        end

        @paste_buffer += "\e[#{csi}"
        return
      end

      @paste_buffer += "\e"
      @paste_buffer += String.build { |str| str.write_byte(second) }
    end

    private def read_csi : String?
      String.build do |str|
        loop do
          byte = read_byte_or_nil
          return nil unless byte

          str.write_byte(byte)
          break if byte.in?(64_u8..126_u8)
        end
      end
    end

    private def parse_mouse_sgr(csi : String, raw : String) : MouseMessage?
      match = /<(\d+);(\d+);(\d+)([Mm])/.match(csi)
      return nil unless match

      cb = match[1].to_i
      cx = match[2].to_i
      cy = match[3].to_i
      final = match[4]

      shift = (cb & 4) != 0
      alt = (cb & 8) != 0
      ctrl = (cb & 16) != 0
      motion_bit = (cb & 32) != 0
      wheel_bit = (cb & 64) != 0

      button = if wheel_bit
                 (cb & 1) == 0 ? MouseButton::WheelUp : MouseButton::WheelDown
               else
                 case cb & 3
                 when 0 then MouseButton::Left
                 when 1 then MouseButton::Middle
                 when 2 then MouseButton::Right
                 else MouseButton::None
                 end
               end

      action = if final == "m"
                 MouseAction::Release
               elsif motion_bit && button != MouseButton::None
                 MouseAction::Drag
               elsif motion_bit
                 MouseAction::Motion
               else
                 MouseAction::Press
               end

      MouseMessage.new(cx, cy, button, action, shift: shift, alt: alt, ctrl: ctrl, raw: raw)
    end

    private def alt_prefixed_message(second : UInt8) : KeyMessage?
      case second
      when 10_u8, 13_u8
        KeyMessage.new(KeyType::Enter, alt: true, raw: "\e\n")
      when 9_u8
        KeyMessage.new(KeyType::Tab, alt: true, raw: "\e\t")
      when 32_u8
        KeyMessage.new(KeyType::Space, alt: true, raw: "\e ")
      when 1_u8..26_u8
        ctrl = ctrl_key_message(second)
        ctrl ? KeyMessage.new(ctrl.type, rune: ctrl.rune, alt: true, ctrl: ctrl.ctrl, raw: "\e#{ctrl.raw}") : nil
      when 33_u8..126_u8
        rune = String.build { |str| str.write_byte(second) }
        KeyMessage.new(KeyType::Rune, rune: rune, alt: true, raw: "\e#{rune}")
      else
        nil
      end
    end

    private def ctrl_key_message(byte : UInt8) : KeyMessage?
      return nil unless byte.in?(1_u8..26_u8)
      letter = (byte + 96).chr.to_s
      KeyMessage.new(KeyType::Rune, rune: letter, ctrl: true, raw: String.build { |str| str.write_byte(byte) })
    end

    private def parse_tilde_code_and_mods(params : String) : Tuple(Int32, Bool, Bool, Bool)
      parts = params.split(';')
      code = parts[0]?.try(&.to_i?) || 0
      mod = parts[1]?
      shift, alt, ctrl = parse_modifier_value(mod)
      {code, shift, alt, ctrl}
    end

    private def parse_modifiers(params : String) : Tuple(Bool, Bool, Bool)
      return {false, false, false} if params.empty?

      parts = params.split(';')
      if parts.size >= 2
        parse_modifier_value(parts[-1]?)
      else
        {false, false, false}
      end
    end

    private def parse_modifier_value(value : String?) : Tuple(Bool, Bool, Bool)
      modifier = value.try(&.to_i?) || 1
      case modifier
      when 2 then {true, false, false}
      when 3 then {false, true, false}
      when 4 then {true, true, false}
      when 5 then {false, false, true}
      when 6 then {true, false, true}
      when 7 then {false, true, true}
      when 8 then {true, true, true}
      else        {false, false, false}
      end
    end

    private def tilde_key_type(code : Int32) : KeyType?
      case code
      when 1, 7
        KeyType::Home
      when 2
        KeyType::Insert
      when 3
        KeyType::Delete
      when 4, 8
        KeyType::End
      when 5
        KeyType::PageUp
      when 6
        KeyType::PageDown
      when 11
        KeyType::F1
      when 12
        KeyType::F2
      when 13
        KeyType::F3
      when 14
        KeyType::F4
      when 15
        KeyType::F5
      when 17
        KeyType::F6
      when 18
        KeyType::F7
      when 19
        KeyType::F8
      when 20
        KeyType::F9
      when 21
        KeyType::F10
      when 23
        KeyType::F11
      when 24
        KeyType::F12
      else
        nil
      end
    end

    private def read_byte_or_nil : UInt8?
      @input.read_byte
    rescue IO::EOFError
      nil
    end
  end
end
