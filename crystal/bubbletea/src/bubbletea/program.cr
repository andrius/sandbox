module BubbleTea
  class Program
    getter model : Model

    @running : Bool
    @input : IO
    @output : IO

    def initialize(@model : Model, @input : IO = STDIN, @output : IO = STDOUT)
      @running = true
    end

    def start : Model
      if cmd = @model.init
        dispatch(cmd.call)
      end

      render

      while @running
        line = @input.gets
        break if line.nil?

        dispatch(UserInputMessage.new(line))
        render
      end

      @model
    end

    private def dispatch(msg : Msg?)
      return if msg.nil?

      if msg.is_a?(QuitMessage)
        @running = false
        return
      end

      updated_model, cmd = @model.update(msg)
      @model = updated_model

      if cmd
        dispatch(cmd.call)
      end
    end

    private def render
      @output << @model.view
      @output << '\n'
    end
  end
end
