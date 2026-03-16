require "../src/bubbletea"

class ClockTickMessage < BubbleTea::Message
  getter now : Time

  def initialize(@now : Time)
  end
end

class ClockModel < BubbleTea::Model
  @now : Time

  def initialize
    @now = Time.local
  end

  def init : BubbleTea::Cmd?
    tick_cmd
  end

  def update(msg : BubbleTea::Msg) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    case msg
    when ClockTickMessage
      @now = msg.now
      return {self, tick_cmd}
    when BubbleTea::KeyMessage
      if msg.type.in?({BubbleTea::KeyType::CtrlC, BubbleTea::KeyType::CtrlD, BubbleTea::KeyType::Escape})
        return {self, BubbleTea.quit}
      end

      if msg.type == BubbleTea::KeyType::Rune
        rune = msg.rune
        if rune && rune.downcase == "q"
          return {self, BubbleTea.quit}
        end
      end
    when BubbleTea::UserInputMessage
      if msg.data.strip.downcase.in?({"q", "quit", "exit"})
        return {self, BubbleTea.quit}
      end
    end

    {self, nil}
  end

  def view : String
    <<-TEXT
#{BubbleTea::Style.bold(BubbleTea::Style.cyan("BubbleTea Crystal Clock Demo", true), true)}
Time: #{BubbleTea::Style.green(@now.to_s("%H:%M:%S"), true)}
Press #{BubbleTea::Style.yellow("q", true)} or #{BubbleTea::Style.yellow("Ctrl+C", true)} to quit.
TEXT
  end

  private def tick_cmd : BubbleTea::Cmd
    BubbleTea.tick(1.second) { ClockTickMessage.new(Time.local).as(BubbleTea::Msg?) }
  end
end

input_mode = ENV["DEMO_LINE_MODE"]? == "1" ? BubbleTea::InputMode::Line : BubbleTea::InputMode::Key
options = BubbleTea::ProgramOptions.new(
  input_mode: input_mode,
  use_alt_screen: input_mode == BubbleTea::InputMode::Key && ENV["DEMO_NO_ALT_SCREEN"]? != "1",
  hide_cursor: input_mode == BubbleTea::InputMode::Key
)

BubbleTea::Program.new(ClockModel.new, options: options).start
