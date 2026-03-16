require "../src/bubbletea"

class PrintDemoModel < BubbleTea::Model
  @status : String

  def initialize
    @status = "Press p=println, f=printf, w=request window size, q=quit"
  end

  def init : BubbleTea::Cmd?
    BubbleTea.println("print demo started")
  end

  def update(msg : BubbleTea::Msg) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    case msg
    when BubbleTea::WindowSizeMessage
      @status = "window size #{msg.width}x#{msg.height}"
      {self, nil}
    when BubbleTea::UserInputMessage
      return handle_token(msg.data.strip.downcase)
    when BubbleTea::KeyMessage
      if msg.type == BubbleTea::KeyType::Rune
        return handle_token(msg.rune.try(&.downcase) || "")
      elsif msg.type.in?({BubbleTea::KeyType::CtrlC, BubbleTea::KeyType::Escape})
        return {self, BubbleTea.quit}
      end
      {self, nil}
    else
      {self, nil}
    end
  end

  def view : String
    <<-TEXT
#{BubbleTea::Style.bold(BubbleTea::Style.cyan("Print Commands Demo", true), true)}
#{BubbleTea::Style.dim("p=println, f=printf, w=request_window_size, q=quit", true)}

Status: #{BubbleTea::Style.green(@status, true)}
TEXT
  end

  private def handle_token(token : String) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    case token
    when "p"
      @status = "println issued"
      {self, BubbleTea.println("line printed from command")}
    when "f"
      @status = "printf issued"
      {self, BubbleTea.printf("formatted value=%d", 42)}
    when "w"
      @status = "window size requested"
      {self, BubbleTea.request_window_size}
    when "q", "quit", "exit"
      {self, BubbleTea.quit}
    else
      {self, nil}
    end
  end
end

input_mode = ENV["DEMO_LINE_MODE"]? == "1" ? BubbleTea::InputMode::Line : BubbleTea::InputMode::Key

program = BubbleTea.new_program(
  PrintDemoModel.new,
  STDIN,
  STDOUT,
  BubbleTea.with_input_mode(input_mode),
  BubbleTea.without_signal_handlers
)

program.run
