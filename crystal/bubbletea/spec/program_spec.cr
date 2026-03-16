require "./spec_helper"

class ProgramStepMessage < BubbleTea::Message
end

class ProgramSequenceModel < BubbleTea::Model
  getter count : Int32

  def initialize
    @count = 0
  end

  def init : BubbleTea::Cmd?
    BubbleTea.sequence(
      -> { ProgramStepMessage.new.as(BubbleTea::Msg?) },
      -> { ProgramStepMessage.new.as(BubbleTea::Msg?) },
      BubbleTea.quit
    )
  end

  def update(msg : BubbleTea::Msg) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    @count += 1 if msg.is_a?(ProgramStepMessage)
    {self, nil}
  end

  def view : String
    "count=#{@count}"
  end
end

class ProgramControlModel < BubbleTea::Model
  def init : BubbleTea::Cmd?
    BubbleTea.sequence(
      BubbleTea.set_window_title("BubbleTea Crystal Test"),
      BubbleTea.enter_alt_screen,
      BubbleTea.enable_mouse_tracking,
      BubbleTea.enable_mouse_all_motion_tracking,
      BubbleTea.enable_focus_reporting,
      BubbleTea.enable_bracketed_paste,
      BubbleTea.beep,
      BubbleTea.clear_screen,
      BubbleTea.disable_bracketed_paste,
      BubbleTea.disable_focus_reporting,
      BubbleTea.disable_mouse_tracking,
      BubbleTea.exit_alt_screen,
      BubbleTea.quit
    )
  end

  def update(msg : BubbleTea::Msg) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    {self, nil}
  end

  def view : String
    "controls"
  end
end

class ProgramErrorCaptureModel < BubbleTea::Model
  getter seen_error : String?

  def initialize
    @seen_error = nil
  end

  def init : BubbleTea::Cmd?
    -> do
      raise "command failed"
      nil.as(BubbleTea::Msg?)
    end
  end

  def update(msg : BubbleTea::Msg) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    if msg.is_a?(BubbleTea::ErrorMessage)
      @seen_error = msg.error.message
      return {self, BubbleTea.quit}
    end
    {self, nil}
  end

  def view : String
    @seen_error || "ok"
  end
end

class ProgramFilterModel < BubbleTea::Model
  getter count : Int32

  def initialize
    @count = 0
  end

  def init : BubbleTea::Cmd?
    BubbleTea.sequence(
      -> { ProgramStepMessage.new.as(BubbleTea::Msg?) },
      -> { ProgramStepMessage.new.as(BubbleTea::Msg?) },
      BubbleTea.quit
    )
  end

  def update(msg : BubbleTea::Msg) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    @count += 1 if msg.is_a?(ProgramStepMessage)
    {self, nil}
  end

  def view : String
    "filtered=#{@count}"
  end
end

class ProgramSendModel < BubbleTea::Model
  getter seen : Array(String)

  def initialize
    @seen = [] of String
  end

  def init : BubbleTea::Cmd?
    nil
  end

  def update(msg : BubbleTea::Msg) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    case msg
    when BubbleTea::UserInputMessage
      @seen << msg.data
    when BubbleTea::QuitMessage
      return {self, nil}
    end
    {self, nil}
  end

  def view : String
    @seen.join(",")
  end
end

class ProgramStartupModel < BubbleTea::Model
  getter count : Int32

  def initialize
    @count = 0
  end

  def init : BubbleTea::Cmd?
    BubbleTea.quit
  end

  def update(msg : BubbleTea::Msg) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    @count += 1 if msg.is_a?(ProgramStepMessage)
    {self, nil}
  end

  def view : String
    "startup=#{@count}"
  end
end

class ProgramSuspendModel < BubbleTea::Model
  def init : BubbleTea::Cmd?
    BubbleTea.sequence(
      BubbleTea.suspend,
      BubbleTea.resume,
      BubbleTea.quit
    )
  end

  def update(msg : BubbleTea::Msg) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    {self, nil}
  end

  def view : String
    "suspend-resume"
  end
end

class ProgramNoRenderModel < BubbleTea::Model
  def init : BubbleTea::Cmd?
    BubbleTea.quit
  end

  def update(msg : BubbleTea::Msg) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    {self, nil}
  end

  def view : String
    "should-not-render"
  end
end

class ProgramPrintModel < BubbleTea::Model
  def init : BubbleTea::Cmd?
    BubbleTea.sequence(
      BubbleTea.println("hello from cmd"),
      BubbleTea.quit
    )
  end

  def update(msg : BubbleTea::Msg) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    {self, nil}
  end

  def view : String
    "print-view"
  end
end

describe BubbleTea::Program do
  it "processes sequence commands asynchronously" do
    output_io = IO::Memory.new
    options = BubbleTea::ProgramOptions.new(read_input: false, listen_window_size: false, enable_renderer_diff: false)
    model = ProgramSequenceModel.new
    program = BubbleTea::Program.new(model, IO::Memory.new, output_io, options: options)

    result = program.start.as(ProgramSequenceModel)

    result.count.should eq(2)
    output_io.to_s.should contain("count=2")
  end

  it "handles renderer control messages" do
    output_io = IO::Memory.new
    options = BubbleTea::ProgramOptions.new(read_input: false, listen_window_size: false, enable_renderer_diff: true)
    model = ProgramControlModel.new
    program = BubbleTea::Program.new(model, IO::Memory.new, output_io, options: options)
    program.start

    content = output_io.to_s
    content.should contain("\e]2;BubbleTea Crystal Test\a")
    content.should contain("\e[?1049h")
    content.should contain("\e[?1002h")
    content.should contain("\e[?1003h")
    content.should contain("\e[?1004h")
    content.should contain("\e[?2004h")
    content.should contain("\e[2J\e[H")
    content.should contain("\e[?2004l")
    content.should contain("\e[?1004l")
    content.should contain("\e[?1002l")
    content.should contain("\e[?1049l")
    content.should contain("\a")
  end

  it "returns ProgramResult and forwards command errors as messages" do
    output_io = IO::Memory.new
    model = ProgramErrorCaptureModel.new
    options = BubbleTea::ProgramOptions.new(read_input: false, listen_window_size: false, enable_renderer_diff: false)
    program = BubbleTea::Program.new(model, IO::Memory.new, output_io, options: options)

    result = program.run

    result.ok?.should be_true
    result.model.should be_a(ProgramErrorCaptureModel)
    result.model.as(ProgramErrorCaptureModel).seen_error.should eq("command failed")
    output_io.to_s.should contain("command failed")

    tuple = program.run_model_error
    tuple[0].should be_a(ProgramErrorCaptureModel)
    tuple[1].should be_nil
  end

  it "supports event filters that can drop messages" do
    output_io = IO::Memory.new
    dropped = false
    filter = ->(msg : BubbleTea::Msg, model : BubbleTea::Model) do
      if msg.is_a?(ProgramStepMessage) && !dropped
        dropped = true
        nil.as(BubbleTea::Msg?)
      else
        msg.as(BubbleTea::Msg?)
      end
    end
    options = BubbleTea::ProgramOptions.new(
      read_input: false,
      listen_window_size: false,
      enable_renderer_diff: false,
      event_filter: filter
    )
    model = ProgramFilterModel.new
    program = BubbleTea::Program.new(model, IO::Memory.new, output_io, options: options)

    result = program.run
    result.model.as(ProgramFilterModel).count.should eq(1)
  end

  it "supports external send and quit APIs" do
    output_io = IO::Memory.new
    model = ProgramSendModel.new
    options = BubbleTea::ProgramOptions.new(read_input: false, listen_window_size: false, enable_renderer_diff: false)
    program = BubbleTea::Program.new(model, IO::Memory.new, output_io, options: options)

    spawn do
      sleep 5.milliseconds
      program.send(BubbleTea::UserInputMessage.new("hello"))
      sleep 5.milliseconds
      program.quit
    end

    result = program.run
    result.model.as(ProgramSendModel).seen.should eq(["hello"])
  end

  it "runs startup commands before model init flow" do
    output_io = IO::Memory.new
    model = ProgramStartupModel.new
    options = BubbleTea::ProgramOptions.new(
      read_input: false,
      listen_window_size: false,
      enable_renderer_diff: false,
      startup_commands: [-> { ProgramStepMessage.new.as(BubbleTea::Msg?) }]
    )
    program = BubbleTea::Program.new(model, IO::Memory.new, output_io, options: options)

    result = program.run
    result.model.as(ProgramStartupModel).count.should eq(1)
  end

  it "applies event filter chain in order" do
    output_io = IO::Memory.new
    model = ProgramSendModel.new
    f1 = ->(msg : BubbleTea::Msg, m : BubbleTea::Model) do
      if msg.is_a?(BubbleTea::UserInputMessage)
        BubbleTea::UserInputMessage.new(msg.data + "-a").as(BubbleTea::Msg?)
      else
        msg.as(BubbleTea::Msg?)
      end
    end
    f2 = ->(msg : BubbleTea::Msg, m : BubbleTea::Model) do
      if msg.is_a?(BubbleTea::UserInputMessage)
        BubbleTea::UserInputMessage.new(msg.data + "-b").as(BubbleTea::Msg?)
      else
        msg.as(BubbleTea::Msg?)
      end
    end
    options = BubbleTea::ProgramOptions.new(
      read_input: false,
      listen_window_size: false,
      enable_renderer_diff: false,
      event_filters: [f1, f2]
    )
    program = BubbleTea::Program.new(model, IO::Memory.new, output_io, options: options)

    spawn do
      sleep 5.milliseconds
      program.send(BubbleTea::UserInputMessage.new("msg"))
      sleep 5.milliseconds
      program.quit
    end

    result = program.run
    result.model.as(ProgramSendModel).seen.should eq(["msg-a-b"])
  end

  it "supports suspend and resume program control messages" do
    output_io = IO::Memory.new
    model = ProgramSuspendModel.new
    options = BubbleTea::ProgramOptions.new(
      read_input: false,
      listen_window_size: false,
      enable_renderer_diff: false,
      hide_cursor: true
    )
    program = BubbleTea::Program.new(model, IO::Memory.new, output_io, options: options)
    program.run

    content = output_io.to_s
    content.scan(/\e\[\?25l/).size.should be >= 2
    content.scan(/\e\[\?25h/).size.should be >= 2
  end

  it "handles print command messages" do
    output_io = IO::Memory.new
    model = ProgramPrintModel.new
    options = BubbleTea::ProgramOptions.new(read_input: false, listen_window_size: false, enable_renderer_diff: false)
    program = BubbleTea::Program.new(model, IO::Memory.new, output_io, options: options)
    program.run

    output_io.to_s.should contain("hello from cmd")
  end

  it "supports window title option at startup" do
    output_io = IO::Memory.new
    model = ProgramNoRenderModel.new
    options = BubbleTea::ProgramOptions.new(
      read_input: false,
      listen_window_size: false,
      enable_renderer_diff: false,
      window_title: "TitleFromOption"
    )
    program = BubbleTea::Program.new(model, IO::Memory.new, output_io, options: options)
    program.run

    output_io.to_s.should contain("\e]2;TitleFromOption\a")
  end

  it "supports disabling renderer entirely" do
    output_io = IO::Memory.new
    model = ProgramNoRenderModel.new
    options = BubbleTea::ProgramOptions.new(
      read_input: false,
      listen_window_size: false,
      disable_renderer: true
    )
    program = BubbleTea::Program.new(model, IO::Memory.new, output_io, options: options)
    program.run

    output_io.to_s.should eq("")
  end
end
