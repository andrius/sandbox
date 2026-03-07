require "./spec_helper"

describe BubbleTea::Renderer do
  it "renders plain output when diff and alt screen are disabled" do
    output_io = IO::Memory.new
    renderer = BubbleTea::Renderer.new(output_io, use_alt_screen: false, use_diff: false, hide_cursor: false)
    renderer.render("hello")

    output_io.to_s.should eq("hello\n")
  end

  it "renders ansi frame output when diffing is enabled" do
    output_io = IO::Memory.new
    renderer = BubbleTea::Renderer.new(output_io, use_alt_screen: false, use_diff: true, hide_cursor: false)
    renderer.render("one")
    renderer.render("two")

    content = output_io.to_s
    content.should contain("\e[H")
    content.should contain("\e[1;1H")
  end

  it "supports alt screen and cursor visibility controls" do
    output_io = IO::Memory.new
    renderer = BubbleTea::Renderer.new(output_io, use_alt_screen: true, use_diff: true, hide_cursor: true)
    renderer.start
    renderer.stop

    content = output_io.to_s
    content.should contain("\e[?1049h")
    content.should contain("\e[?25l")
    content.should contain("\e[?25h")
    content.should contain("\e[?1049l")
  end
end
