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
end
