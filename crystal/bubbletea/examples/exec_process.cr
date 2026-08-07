require "../src/bubbletea"

class ExecDemoModel < BubbleTea::Model
  @status : String
  @stdout : String
  @stderr : String
  @exit_code : Int32

  def initialize
    @status = "starting"
    @stdout = ""
    @stderr = ""
    @exit_code = 0
  end

  def init : BubbleTea::Cmd?
    BubbleTea.exec_process("sh", ["-lc", "uname -s"])
  end

  def update(msg : BubbleTea::Msg) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    case msg
    when BubbleTea::ExecProcessResultMessage
      @status = msg.success ? "ok" : "failed"
      @stdout = msg.stdout.strip
      @stderr = msg.stderr.strip
      @exit_code = msg.exit_code
    when BubbleTea::UserInputMessage
      token = msg.data.strip.downcase
      return trigger_action(token)
    when BubbleTea::KeyMessage
      return trigger_action(msg.rune.try(&.downcase) || "") if msg.type == BubbleTea::KeyType::Rune
      return {self, BubbleTea.quit} if msg.type.in?({BubbleTea::KeyType::Escape, BubbleTea::KeyType::CtrlC})
    end

    {self, nil}
  end

  def view : String
    <<-TEXT
#{BubbleTea::Style.bold(BubbleTea::Style.cyan("Exec Process Demo", true), true)}
#{BubbleTea::Style.dim("r=rerun, e=error command, q=quit", true)}

Status   : #{@status}
ExitCode : #{@exit_code}
Stdout   : #{@stdout.empty? ? "(empty)" : @stdout}
Stderr   : #{@stderr.empty? ? "(empty)" : @stderr}
TEXT
  end

  private def trigger_action(token : String) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    case token
    when "r"
      @status = "running uname -s"
      {self, BubbleTea.exec_process("sh", ["-lc", "uname -s"])}
    when "e"
      @status = "running failing command"
      {self, BubbleTea.exec("echo err 1>&2; exit 2")}
    when "q", "quit", "exit"
      {self, BubbleTea.quit}
    else
      {self, nil}
    end
  end
end

input_mode = ENV["DEMO_LINE_MODE"]? == "1" ? BubbleTea::InputMode::Line : BubbleTea::InputMode::Key
program = BubbleTea.new_program(
  ExecDemoModel.new,
  STDIN,
  STDOUT,
  BubbleTea.with_input_mode(input_mode),
  BubbleTea.without_signal_handlers
)
program.run
