require "../src/bubbletea"

class SuspendResumeModel < BubbleTea::Model
  @status : String

  def initialize
    @status = "Press s=suspend, r=resume, q=quit"
  end

  def init : BubbleTea::Cmd?
    nil
  end

  def update(msg : BubbleTea::Msg) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    case msg
    when BubbleTea::KeyMessage
      return handle_token(msg.rune.try(&.downcase) || "") if msg.type == BubbleTea::KeyType::Rune
      if msg.type.in?({BubbleTea::KeyType::CtrlC, BubbleTea::KeyType::Escape})
        @status = "quitting"
        return {self, BubbleTea.quit}
      end
    when BubbleTea::UserInputMessage
      return handle_token(msg.data.strip.downcase)
    end

    {self, nil}
  end

  def view : String
    <<-TEXT
#{BubbleTea::Style.bold(BubbleTea::Style.cyan("Suspend/Resume Demo", true), true)}
#{BubbleTea::Style.dim("s=suspend, r=resume, q=quit", true)}

Status: #{BubbleTea::Style.green(@status, true)}
TEXT
  end

  private def handle_token(token : String) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    case token
    when "s"
      @status = "suspend requested"
      {self, BubbleTea.suspend}
    when "r"
      @status = "resume requested"
      {self, BubbleTea.resume}
    when "q", "quit", "exit"
      @status = "quitting"
      {self, BubbleTea.quit}
    else
      {self, nil}
    end
  end
end

input_mode = ENV["DEMO_LINE_MODE"]? == "1" ? BubbleTea::InputMode::Line : BubbleTea::InputMode::Key
options = BubbleTea::ProgramOptions.new(
  input_mode: input_mode,
  use_alt_screen: input_mode == BubbleTea::InputMode::Key && ENV["DEMO_NO_ALT_SCREEN"]? != "1",
  hide_cursor: input_mode == BubbleTea::InputMode::Key,
  trap_suspend_continue: true
)

BubbleTea::Program.new(SuspendResumeModel.new, options: options).start
