require "./spec_helper"

class OptionsSmokeModel < BubbleTea::Model
  def init : BubbleTea::Cmd?
    BubbleTea.quit
  end

  def update(msg : BubbleTea::Msg) : Tuple(BubbleTea::Model, BubbleTea::Cmd?)
    {self, nil}
  end

  def view : String
    "ok"
  end
end

describe "BubbleTea option builders" do
  it "builds a program via new_program helper" do
    model = OptionsSmokeModel.new
    program = BubbleTea.new_program(
      model,
      IO::Memory.new,
      IO::Memory.new,
      BubbleTea.with_input_mode(BubbleTea::InputMode::Line),
      BubbleTea.with_alt_screen,
      BubbleTea.with_mouse_all_motion
    )

    program.should be_a(BubbleTea::Program)
  end

  it "accumulates event filters and startup commands through options" do
    filter = ->(msg : BubbleTea::Msg, model : BubbleTea::Model) { msg.as(BubbleTea::Msg?) }
    cmd = -> { BubbleTea::QuitMessage.new.as(BubbleTea::Msg?) }
    opts = BubbleTea.with_event_filter(filter).call(BubbleTea::ProgramOptions.new)
    opts = BubbleTea.with_startup_command(cmd).call(opts)

    opts.event_filters.size.should eq(1)
    opts.startup_commands.size.should eq(1)
  end
end
