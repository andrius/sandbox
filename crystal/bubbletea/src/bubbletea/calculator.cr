module BubbleTea
  class NumberInputMessage < Message
    getter token : String

    def initialize(@token : String)
    end
  end

  class OperatorMessage < Message
    getter operator : String

    def initialize(@operator : String)
    end
  end

  class EvaluateMessage < Message
  end

  class ClearAllMessage < Message
  end

  class ClearEntryMessage < Message
  end

  class BackspaceMessage < Message
  end

  class InvalidInputMessage < Message
    getter token : String

    def initialize(@token : String)
    end
  end

  class CalculatorModel < Model
    @accumulator : Int64?
    @pending_operator : String?
    @input_buffer : String
    @history : Array(String)
    @error : String?
    @color_enabled : Bool

    def initialize(*, @color_enabled : Bool = Style.enabled_for?(STDOUT))
      @accumulator = nil
      @pending_operator = nil
      @input_buffer = ""
      @history = [] of String
      @error = nil
    end

    def init : Cmd?
      nil
    end

    def update(msg : Msg) : Tuple(Model, Cmd?)
      case msg
      when UserInputMessage
        token = msg.data.strip
        return {self, nil} if token.empty?

        normalized = token.downcase

        case normalized
        when "q", "quit", "exit"
          return {self, -> { QuitMessage.new.as(Msg?) }}
        when "c", "clear"
          return {self, -> { ClearAllMessage.new.as(Msg?) }}
        when "ce"
          return {self, -> { ClearEntryMessage.new.as(Msg?) }}
        when "bs", "back"
          return {self, -> { BackspaceMessage.new.as(Msg?) }}
        when "+", "-", "*", "/"
          return {self, -> { OperatorMessage.new(normalized).as(Msg?) }}
        when "=", "enter"
          return {self, -> { EvaluateMessage.new.as(Msg?) }}
        else
          if token.matches?(/\A\d+\z/)
            return {self, -> { NumberInputMessage.new(token).as(Msg?) }}
          end

          return {self, -> { InvalidInputMessage.new(token).as(Msg?) }}
        end
      when NumberInputMessage
        append_number(msg.token)
      when OperatorMessage
        set_operator(msg.operator)
      when EvaluateMessage
        evaluate
      when ClearAllMessage
        clear_all
      when ClearEntryMessage
        clear_entry
      when BackspaceMessage
        backspace
      when InvalidInputMessage
        @error = "Unsupported input: #{msg.token}"
      end

      {self, nil}
    end

    def view : String
      recent_history = rendered_history
      error_line = rendered_error_line

      <<-TEXT
#{Style.bold(Style.cyan("Interactive calculator (Bubble Tea Crystal draft)", @color_enabled), @color_enabled)}
Enter one token per line:
  number : #{Style.green("12", @color_enabled)}
  op     : #{Style.yellow("+ - * /", @color_enabled)}
  =      : #{Style.blue("evaluate", @color_enabled)}
  ce     : #{Style.blue("clear entry", @color_enabled)}
  c      : #{Style.blue("clear all", @color_enabled)}
  bs     : #{Style.blue("backspace", @color_enabled)}
  q      : #{Style.magenta("quit", @color_enabled)}

Expression: #{Style.yellow(expression_preview, @color_enabled)}
Display   : #{Style.green(display_value, @color_enabled)}
#{error_line}
#{Style.bold("History:", @color_enabled)}
#{recent_history}
TEXT
    end

    private def append_number(token : String)
      @input_buffer += token
      @error = nil
    end

    private def set_operator(operator : String)
      if @input_buffer.empty?
        if @accumulator
          @pending_operator = operator
          @error = nil
        else
          @error = "Enter a number first."
        end

        return
      end

      current_value = @input_buffer.to_i64

      if @accumulator && @pending_operator
        lhs = @accumulator.not_nil!
        result = apply_operation(lhs, current_value, @pending_operator.not_nil!)
        return if result.nil?

        @accumulator = result
      else
        @accumulator = current_value
      end

      @input_buffer = ""
      @pending_operator = operator
      @error = nil
    end

    private def evaluate
      if @pending_operator.nil?
        if @input_buffer.empty?
          @error = "Nothing to evaluate."
        else
          @accumulator = @input_buffer.to_i64
          @input_buffer = ""
          @error = nil
        end

        return
      end

      if @input_buffer.empty?
        @error = "Enter the second operand."
        return
      end

      lhs = @accumulator || 0_i64
      rhs = @input_buffer.to_i64
      operator = @pending_operator.not_nil!
      result = apply_operation(lhs, rhs, operator)
      return if result.nil?

      @history << "#{lhs} #{operator} #{rhs} = #{result}"
      @accumulator = result
      @pending_operator = nil
      @input_buffer = ""
      @error = nil
    end

    private def clear_all
      @accumulator = nil
      @pending_operator = nil
      @input_buffer = ""
      @error = nil
    end

    private def clear_entry
      @input_buffer = ""
      @error = nil
    end

    private def backspace
      return if @input_buffer.empty?

      if @input_buffer.size <= 1
        @input_buffer = ""
      else
        @input_buffer = @input_buffer[0...-1]
      end

      @error = nil
    end

    private def apply_operation(lhs : Int64, rhs : Int64, operator : String) : Int64?
      case operator
      when "+"
        lhs + rhs
      when "-"
        lhs - rhs
      when "*"
        lhs * rhs
      when "/"
        if rhs == 0
          @error = "Cannot divide by zero."
          nil
        else
          lhs // rhs
        end
      else
        @error = "Unknown operator: #{operator}"
        nil
      end
    end

    private def expression_preview : String
      lhs = @accumulator ? @accumulator.not_nil!.to_s : "_"
      operator = @pending_operator || "_"
      rhs = @input_buffer.empty? ? "_" : @input_buffer
      "#{lhs} #{operator} #{rhs}"
    end

    private def display_value : String
      return @input_buffer unless @input_buffer.empty?
      return @accumulator.not_nil!.to_s if @accumulator

      "0"
    end

    private def rendered_history : String
      if @history.empty?
        "  #{Style.dim("(empty)", @color_enabled)}"
      else
        @history.last(5).map { |line| "  #{Style.cyan(line, @color_enabled)}" }.join("\n")
      end
    end

    private def rendered_error_line : String
      if error = @error
        "Error     : #{Style.red(error, @color_enabled)}"
      else
        "Error     : #{Style.dim("(none)", @color_enabled)}"
      end
    end
  end
end
