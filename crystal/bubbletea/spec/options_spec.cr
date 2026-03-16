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

  it "supports module-level run/start helpers" do
    model = OptionsSmokeModel.new

    result = BubbleTea.run(model, IO::Memory.new, IO::Memory.new, BubbleTea.with_input_mode(BubbleTea::InputMode::Line))
    result.ok?.should be_true
    result.model.should be_a(OptionsSmokeModel)

    model2 = OptionsSmokeModel.new
    final_model = BubbleTea.start(model2, IO::Memory.new, IO::Memory.new, BubbleTea.with_input_mode(BubbleTea::InputMode::Line))
    final_model.should be_a(OptionsSmokeModel)
  end

  it "supports additional with_* compatibility options" do
    opts = BubbleTea::ProgramOptions.new
    opts = BubbleTea.with_focus_reporting(true).call(opts)
    opts = BubbleTea.with_bracketed_paste(true).call(opts)
    opts = BubbleTea.with_signal_handlers(false).call(opts)
    opts = BubbleTea.with_window_title("Demo").call(opts)
    opts = BubbleTea.without_renderer.call(opts)
    opts = BubbleTea.with_mouse_all_motion.call(opts)
    opts = BubbleTea.with_mouse_disabled.call(opts)

    opts.enable_focus_reporting.should be_true
    opts.enable_bracketed_paste.should be_true
    opts.trap_signals.should be_false
    opts.window_title.should eq("Demo")
    opts.disable_renderer.should be_true
    opts.enable_mouse.should be_false
    opts.mouse_mode.should eq(BubbleTea::MouseMode::Off)
  end
end
