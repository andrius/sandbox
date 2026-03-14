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
    Home
    End
    Insert
    Delete
    PageUp
    PageDown
    F1
    F2
    F3
    F4
    F5
    F6
    F7
    F8
    F9
    F10
    F11
    F12
    CtrlC
    CtrlD
    Unknown
  end

  class KeyMessage < Message
    getter type : KeyType
    getter rune : String?
    getter shift : Bool
    getter alt : Bool
    getter ctrl : Bool
    getter raw : String

    def initialize(
      @type : KeyType,
      @rune : String? = nil,
      @shift : Bool = false,
      @alt : Bool = false,
      @ctrl : Bool = false,
      @raw : String = ""
    )
    end
  end

  class WindowSizeMessage < Message
    getter width : Int32
    getter height : Int32

    def initialize(@width : Int32, @height : Int32)
    end
  end

  enum MouseButton
    Left
    Middle
    Right
    WheelUp
    WheelDown
    None
  end

  enum MouseAction
    Press
    Release
    Motion
    Drag
  end

  class MouseMessage < Message
    getter x : Int32
    getter y : Int32
    getter button : MouseButton
    getter action : MouseAction
    getter shift : Bool
    getter alt : Bool
    getter ctrl : Bool
    getter raw : String

    def initialize(
      @x : Int32,
      @y : Int32,
      @button : MouseButton,
      @action : MouseAction,
      @shift : Bool = false,
      @alt : Bool = false,
      @ctrl : Bool = false,
      @raw : String = ""
    )
    end
  end

  class FocusMessage < Message
  end

  class BlurMessage < Message
  end

  class PasteStartMessage < Message
  end

  class PasteEndMessage < Message
  end

  class PasteMessage < Message
    getter content : String

    def initialize(@content : String)
    end
  end

  class ErrorMessage < Message
    getter error : Exception

    def initialize(@error : Exception)
    end
  end

  class InterruptMessage < Message
  end

  class TerminateMessage < Message
  end

  class SuspendMessage < Message
  end

  class ResumeMessage < Message
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
