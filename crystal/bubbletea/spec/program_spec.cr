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
      BubbleTea.enter_alt_screen,
      BubbleTea.enable_mouse_tracking,
      BubbleTea.enable_focus_reporting,
      BubbleTea.enable_bracketed_paste,
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
    content.should contain("\e[?1049h")
    content.should contain("\e[?1002h")
    content.should contain("\e[?1004h")
    content.should contain("\e[?2004h")
    content.should contain("\e[2J\e[H")
    content.should contain("\e[?2004l")
    content.should contain("\e[?1004l")
    content.should contain("\e[?1002l")
    content.should contain("\e[?1049l")
  end
end
