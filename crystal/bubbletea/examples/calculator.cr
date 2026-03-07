require "../src/bubbletea"

class NumberInputMessage < BubbleTea::Message
  getter token : String

  def initialize(@token : String)
  end
end

class OperatorMessage < BubbleTea::Message
  getter operator : String

  def initialize(@operator : String)
  end
end

class EvaluateMessage < BubbleTea::Message
end

class ClearAllMessage < BubbleTea::Message
end

class ClearEntryMessage < BubbleTea::Message
end

class BackspaceMessage < BubbleTea::Message
end

class InvalidInputMessage < BubbleTea::Message
  getter token : String

  def initialize(@token : String)
  end
end

class CalculatorModel < BubbleTea::Model
  @accumulator : Int64?
  @pending_operator : String?
  @input_buffer : String
  @history : Array(String)
  @error : String?

  def initialize
    @accumulator = nil
    @pending_operator = nil
    @input_buffer = ""
    @history = [] of String
    @error = nil
  end

  def init : BubbleTea::Cmd?
    nil
  end

  def update(msg : BubbleTea::Msg) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    case msg
    when BubbleTea::UserInputMessage
      token = msg.data.strip
      return {self, nil} if token.empty?

      normalized = token.downcase

      case normalized
      when "q", "quit", "exit"
        return {self, -> { BubbleTea::QuitMessage.new.as(BubbleTea::Msg?) }}
      when "c", "clear"
        return {self, -> { ClearAllMessage.new.as(BubbleTea::Msg?) }}
      when "ce"
        return {self, -> { ClearEntryMessage.new.as(BubbleTea::Msg?) }}
      when "bs", "back"
        return {self, -> { BackspaceMessage.new.as(BubbleTea::Msg?) }}
      when "+", "-", "*", "/"
        return {self, -> { OperatorMessage.new(normalized).as(BubbleTea::Msg?) }}
      when "=", "enter"
        return {self, -> { EvaluateMessage.new.as(BubbleTea::Msg?) }}
      else
        if token.matches?(/\A\d+\z/)
          return {self, -> { NumberInputMessage.new(token).as(BubbleTea::Msg?) }}
        end

        return {self, -> { InvalidInputMessage.new(token).as(BubbleTea::Msg?) }}
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
    recent_history = if @history.empty?
                       "  (empty)"
                     else
                       @history.last(5).map { |line| "  #{line}" }.join("\n")
                     end

    error_line = @error ? "Error     : #{@error}" : "Error     : (none)"

    <<-TEXT
Interactive calculator (Bubble Tea Crystal draft)
Enter one token per line:
  number : 12
  op     : + - * /
  =      : evaluate
  ce     : clear entry
  c      : clear all
  bs     : backspace
  q      : quit

Expression: #{expression_preview}
Display   : #{display_value}
#{error_line}
History:
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
end

BubbleTea::Program.new(CalculatorModel.new).start
