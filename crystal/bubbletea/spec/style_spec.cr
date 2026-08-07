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

  it "lets FORCE_COLOR override NO_COLOR" do
    previous_force = ENV["FORCE_COLOR"]?
    previous_no_color = ENV["NO_COLOR"]?

    begin
      ENV["FORCE_COLOR"] = "1"
      ENV["NO_COLOR"] = "1"
      BubbleTea::Style.enabled_for?(IO::Memory.new).should be_true
    ensure
      if previous_force
        ENV["FORCE_COLOR"] = previous_force
      else
        ENV.delete("FORCE_COLOR")
      end

      if previous_no_color
        ENV["NO_COLOR"] = previous_no_color
      else
        ENV.delete("NO_COLOR")
      end
    end
  end
end
