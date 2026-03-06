module BubbleTea
  abstract class Message
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
