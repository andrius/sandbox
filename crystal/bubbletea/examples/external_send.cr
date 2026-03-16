require "../src/bubbletea"

class PingMessage < BubbleTea::Message
  getter index : Int32

  def initialize(@index : Int32)
  end
end

class ExternalSendModel < BubbleTea::Model
  @count : Int32

  def initialize
    @count = 0
  end

  def init : BubbleTea::Cmd?
    nil
  end

  def update(msg : BubbleTea::Msg) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    case msg
    when PingMessage
      @count = msg.index
    end
    {self, nil}
  end

  def view : String
    <<-TEXT
#{BubbleTea::Style.bold(BubbleTea::Style.cyan("External Send Demo", true), true)}
Count: #{BubbleTea::Style.green(@count.to_s, true)}
TEXT
  end
end

options = BubbleTea::ProgramOptions.new(
  read_input: false,
  listen_window_size: false,
  trap_signals: false,
  use_alt_screen: true,
  hide_cursor: true
)
program = BubbleTea::Program.new(ExternalSendModel.new, options: options)

spawn do
  (1..5).each do |i|
    sleep 300.milliseconds
    program.send(PingMessage.new(i))
  end
  sleep 500.milliseconds
  program.quit
end

program.run
