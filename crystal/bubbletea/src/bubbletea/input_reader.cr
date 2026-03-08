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

      yield KeyMessage.new(KeyType::Escape, raw: "\e")
      trailing = String.build { |str| str.write_byte(second) }
      yield KeyMessage.new(KeyType::Rune, rune: trailing, raw: trailing)
    end

    private def parse_csi_sequence(&block : Msg ->)
      csi = read_csi
      unless csi
        yield KeyMessage.new(KeyType::Escape, raw: "\e[")
        return
      end

      raw = "\e[#{csi}"
      case csi
      when "A"
        yield KeyMessage.new(KeyType::Up, raw: raw)
      when "B"
        yield KeyMessage.new(KeyType::Down, raw: raw)
      when "C"
        yield KeyMessage.new(KeyType::Right, raw: raw)
      when "D"
        yield KeyMessage.new(KeyType::Left, raw: raw)
      when "H"
        yield KeyMessage.new(KeyType::Home, raw: raw)
      when "F"
        yield KeyMessage.new(KeyType::End, raw: raw)
      when "2~"
        yield KeyMessage.new(KeyType::Insert, raw: raw)
      when "3~"
        yield KeyMessage.new(KeyType::Delete, raw: raw)
      when "5~"
        yield KeyMessage.new(KeyType::PageUp, raw: raw)
      when "6~"
        yield KeyMessage.new(KeyType::PageDown, raw: raw)
      when "I"
        yield FocusMessage.new
      when "O"
        yield BlurMessage.new
      when "200~"
        @in_bracketed_paste = true
        @paste_buffer = ""
        yield PasteStartMessage.new
      when "201~"
        # End marker without a start: ignore.
      else
        if mouse = parse_mouse_sgr(csi, raw)
          yield mouse
        else
          yield KeyMessage.new(KeyType::Unknown, raw: raw)
        end
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

    private def read_byte_or_nil : UInt8?
      @input.read_byte
    rescue IO::EOFError
      nil
    end
  end
end
