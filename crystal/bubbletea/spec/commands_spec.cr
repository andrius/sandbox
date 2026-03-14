require "./spec_helper"

describe "BubbleTea command helpers" do
  it "creates batch command messages" do
    cmd = BubbleTea.batch(BubbleTea.quit, BubbleTea.clear_screen)
    cmd.should_not be_nil

    msg = cmd.not_nil!.call
    msg.should be_a(BubbleTea::BatchCommandMessage)
    msg.as(BubbleTea::BatchCommandMessage).cmds.size.should eq(2)
  end

  it "creates sequence command messages" do
    cmd = BubbleTea.sequence(BubbleTea.clear_screen, BubbleTea.quit)
    cmd.should_not be_nil

    msg = cmd.not_nil!.call
    msg.should be_a(BubbleTea::SequenceCommandMessage)
    msg.as(BubbleTea::SequenceCommandMessage).cmds.size.should eq(2)
  end

  it "runs tick with delay" do
    started = Time.monotonic
    msg = BubbleTea.tick(15.milliseconds) { BubbleTea::QuitMessage.new.as(BubbleTea::Msg?) }.call
    elapsed = Time.monotonic - started

    msg.should be_a(BubbleTea::QuitMessage)
    elapsed.should be >= 10.milliseconds
  end

  it "runs every with timestamp callback" do
    cmd = BubbleTea.every(1.millisecond) do |time|
      BubbleTea::UserInputMessage.new(time.to_s).as(BubbleTea::Msg?)
    end
    msg = cmd.call

    msg.should be_a(BubbleTea::UserInputMessage)
    msg.as(BubbleTea::UserInputMessage).data.should_not be_empty
  end

  it "builds mouse tracking command messages" do
    enable_msg = BubbleTea.enable_mouse_tracking.call
    enable_all_msg = BubbleTea.enable_mouse_all_motion_tracking.call
    disable_msg = BubbleTea.disable_mouse_tracking.call

    enable_msg.should be_a(BubbleTea::EnableMouseTrackingMessage)
    enable_all_msg.should be_a(BubbleTea::EnableMouseAllMotionTrackingMessage)
    disable_msg.should be_a(BubbleTea::DisableMouseTrackingMessage)
  end

  it "builds focus and paste control command messages" do
    focus_on = BubbleTea.enable_focus_reporting.call
    focus_off = BubbleTea.disable_focus_reporting.call
    paste_on = BubbleTea.enable_bracketed_paste.call
    paste_off = BubbleTea.disable_bracketed_paste.call

    focus_on.should be_a(BubbleTea::EnableFocusReportingMessage)
    focus_off.should be_a(BubbleTea::DisableFocusReportingMessage)
    paste_on.should be_a(BubbleTea::EnableBracketedPasteMessage)
    paste_off.should be_a(BubbleTea::DisableBracketedPasteMessage)
  end

  it "builds title and beep command messages" do
    title_msg = BubbleTea.set_window_title("demo").call
    beep_msg = BubbleTea.beep.call

    title_msg.should be_a(BubbleTea::SetWindowTitleMessage)
    title_msg.as(BubbleTea::SetWindowTitleMessage).title.should eq("demo")
    beep_msg.should be_a(BubbleTea::BeepMessage)
  end

  it "builds suspend and resume command messages" do
    suspend_msg = BubbleTea.suspend.call
    resume_msg = BubbleTea.resume.call

    suspend_msg.should be_a(BubbleTea::SuspendProgramMessage)
    resume_msg.should be_a(BubbleTea::ResumeProgramMessage)
  end
end
