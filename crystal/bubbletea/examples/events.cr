require "../src/bubbletea"

class EventsModel < BubbleTea::Model
  @lines : Array(String)
  @width : Int32
  @height : Int32

  def initialize
    @lines = [] of String
    @width = 0
    @height = 0
  end

  def init : BubbleTea::Cmd?
    BubbleTea.batch(
      BubbleTea.enter_alt_screen,
      BubbleTea.hide_cursor,
      BubbleTea.enable_mouse_tracking
    )
  end

  def update(msg : BubbleTea::Msg) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    case msg
    when BubbleTea::WindowSizeMessage
      @width = msg.width
      @height = msg.height
      push_line("resize #{@width}x#{@height}")
    when BubbleTea::MouseMessage
      push_line("mouse #{msg.action} #{msg.button} x=#{msg.x} y=#{msg.y} mods=#{mods(msg)}")
    when BubbleTea::KeyMessage
      push_line("key #{msg.type} raw=#{msg.raw.inspect}")
      if msg.type.in?({BubbleTea::KeyType::CtrlC, BubbleTea::KeyType::Escape})
        return {self, BubbleTea.quit}
      end
      if msg.type == BubbleTea::KeyType::Rune && msg.rune.try(&.downcase) == "q"
        return {self, BubbleTea.quit}
      end
    when BubbleTea::UserInputMessage
      push_line("line #{msg.data.strip.inspect}")
      if msg.data.strip.downcase.in?({"q", "quit", "exit"})
        return {self, BubbleTea.quit}
      end
    end

    {self, nil}
  end

  def view : String
    header = BubbleTea::Style.bold(BubbleTea::Style.cyan("BubbleTea Event Inspector", true), true)
    hint = BubbleTea::Style.dim("Press q / Esc / Ctrl+C to quit.", true)
    size = if @width > 0 && @height > 0
             "Size: #{@width}x#{@height}"
           else
             "Size: unknown"
           end
    entries = if @lines.empty?
                "  (no events yet)"
              else
                @lines.last(12).map { |line| "  #{line}" }.join("\n")
              end

    <<-TEXT
#{header}
#{hint}
#{size}

Recent events:
#{entries}
TEXT
  end

  private def mods(msg : BubbleTea::MouseMessage) : String
    parts = [] of String
    parts << "shift" if msg.shift
    parts << "alt" if msg.alt
    parts << "ctrl" if msg.ctrl
    parts.empty? ? "-" : parts.join("+")
  end

  private def push_line(line : String)
    @lines << "#{Time.local.to_s("%H:%M:%S")} #{line}"
    @lines = @lines.last(50)
  end
end

input_mode = ENV["DEMO_LINE_MODE"]? == "1" ? BubbleTea::InputMode::Line : BubbleTea::InputMode::Key
options = BubbleTea::ProgramOptions.new(
  input_mode: input_mode,
  use_alt_screen: input_mode == BubbleTea::InputMode::Key && ENV["DEMO_NO_ALT_SCREEN"]? != "1",
  hide_cursor: input_mode == BubbleTea::InputMode::Key,
  enable_mouse: input_mode == BubbleTea::InputMode::Key
)

BubbleTea::Program.new(EventsModel.new, options: options).start
