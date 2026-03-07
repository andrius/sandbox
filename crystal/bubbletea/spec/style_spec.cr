require "./spec_helper"

describe BubbleTea::Style do
  it "does not decorate text when disabled" do
    BubbleTea::Style.green("ok", false).should eq("ok")
  end

  it "adds ANSI escapes when enabled" do
    styled = BubbleTea::Style.cyan("ok", true)
    styled.should contain("\e[")
    styled.should contain("ok")
  end
end
