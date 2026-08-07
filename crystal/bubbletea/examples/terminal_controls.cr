require "../src/bubbletea"

class TerminalControlsModel < BubbleTea::Model
  @status : String

  def initialize
    @status = "Press b=beep, t=title, q=quit"
  end

  def init : BubbleTea::Cmd?
    BubbleTea.sequence(
      BubbleTea.set_window_title("BubbleTea Crystal Controls"),
      BubbleTea.beep
    )
  end

  def update(msg : BubbleTea::Msg) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    case msg
    when BubbleTea::KeyMessage
      return handle_key(msg)
    when BubbleTea::UserInputMessage
      return handle_token(msg.data.strip.downcase)
    end

    {self, nil}
  end

  def view : String
    <<-TEXT
#{BubbleTea::Style.bold(BubbleTea::Style.cyan("Terminal Controls Demo", true), true)}
#{BubbleTea::Style.dim("Press b=beep, t=title, q=quit", true)}

Status: #{BubbleTea::Style.green(@status, true)}
TEXT
  end

  private def handle_key(msg : BubbleTea::KeyMessage) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    case msg.type
    when BubbleTea::KeyType::CtrlC, BubbleTea::KeyType::Escape
      @status = "quitting"
      {self, BubbleTea.quit}
    when BubbleTea::KeyType::Rune
      token = msg.rune.try(&.downcase) || ""
      handle_token(token)
    else
      {self, nil}
    end
  end

  private def handle_token(token : String) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    case token
    when "b"
      @status = "beep triggered"
      {self, BubbleTea.beep}
    when "t"
      title = "BubbleTea #{Time.local.to_s("%H:%M:%S")}"
      @status = "title updated to #{title}"
      {self, BubbleTea.set_window_title(title)}
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
  hide_cursor: input_mode == BubbleTea::InputMode::Key
)

BubbleTea::Program.new(TerminalControlsModel.new, options: options).start
