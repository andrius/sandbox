require "../src/bubbletea"

class IncrementMessage < BubbleTea::Message
end

class DecrementMessage < BubbleTea::Message
end

class CounterModel < BubbleTea::Model
  @count : Int32

  def initialize
    @count = 0
  end

  def init : BubbleTea::Cmd?
    nil
  end

  def update(msg : BubbleTea::Msg) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    case msg
    when BubbleTea::UserInputMessage
      case msg.data.strip
      when "+"
        return {self, -> { IncrementMessage.new.as(BubbleTea::Msg?) }}
      when "-"
        return {self, -> { DecrementMessage.new.as(BubbleTea::Msg?) }}
      when "q", "quit"
        return {self, -> { BubbleTea::QuitMessage.new.as(BubbleTea::Msg?) }}
      end
    when IncrementMessage
      @count += 1
    when DecrementMessage
      @count -= 1
    end

    {self, nil}
  end

  def view : String
    <<-TEXT
Counter example (Bubble Tea Crystal draft)
  + / - : increment/decrement
  q     : quit

Current count: #{@count}
TEXT
  end
end

BubbleTea::Program.new(CounterModel.new).start
