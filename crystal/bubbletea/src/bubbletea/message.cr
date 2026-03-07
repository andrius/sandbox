module BubbleTea
  abstract class Message
  end

  enum KeyType
    Rune
    Enter
    Escape
    Backspace
    Tab
    Space
    Up
    Down
    Left
    Right
    CtrlC
    CtrlD
    Unknown
  end

  class KeyMessage < Message
    getter type : KeyType
    getter rune : String?
    getter raw : String

    def initialize(@type : KeyType, @rune : String? = nil, @raw : String = "")
    end
  end

  class WindowSizeMessage < Message
    getter width : Int32
    getter height : Int32

    def initialize(@width : Int32, @height : Int32)
    end
  end

  class UserInputMessage < Message
    getter data : String

    def initialize(@data : String)
    end
  end

  class QuitMessage < Message
  end

  alias Msg = Message
end
