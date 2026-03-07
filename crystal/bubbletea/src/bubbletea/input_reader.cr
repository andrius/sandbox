module BubbleTea
  class InputReader
    @input : IO
    @mode : InputMode

    def initialize(@input : IO, @mode : InputMode)
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
        third = read_byte_or_nil
        if third
          case third
          when 65_u8
            yield KeyMessage.new(KeyType::Up, raw: "\e[A")
          when 66_u8
            yield KeyMessage.new(KeyType::Down, raw: "\e[B")
          when 67_u8
            yield KeyMessage.new(KeyType::Right, raw: "\e[C")
          when 68_u8
            yield KeyMessage.new(KeyType::Left, raw: "\e[D")
          else
            yield KeyMessage.new(KeyType::Unknown, raw: "\e[#{third.chr}")
          end
          return
        end
      end

      yield KeyMessage.new(KeyType::Escape, raw: "\e")
      trailing = String.build { |str| str.write_byte(second) }
      yield KeyMessage.new(KeyType::Rune, rune: trailing, raw: trailing)
    end

    private def read_byte_or_nil : UInt8?
      @input.read_byte
    rescue IO::EOFError
      nil
    end
  end
end
