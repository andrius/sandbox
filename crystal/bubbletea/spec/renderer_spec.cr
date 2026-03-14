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

  it "enables and disables mouse tracking sequences" do
    output_io = IO::Memory.new
    renderer = BubbleTea::Renderer.new(output_io, use_alt_screen: false, use_diff: false, hide_cursor: false)
    renderer.enable_mouse_tracking
    renderer.enable_mouse_all_motion_tracking
    renderer.disable_mouse_tracking

    content = output_io.to_s
    content.should contain("\e[?1002h")
    content.should contain("\e[?1003h")
    content.should contain("\e[?1006h")
    content.should contain("\e[?1002l")
    content.should contain("\e[?1003l")
    content.should contain("\e[?1006l")
  end

  it "enables and disables focus and bracketed paste sequences" do
    output_io = IO::Memory.new
    renderer = BubbleTea::Renderer.new(output_io, use_alt_screen: false, use_diff: false, hide_cursor: false)
    renderer.enable_focus_reporting
    renderer.enable_bracketed_paste
    renderer.disable_bracketed_paste
    renderer.disable_focus_reporting

    content = output_io.to_s
    content.should contain("\e[?1004h")
    content.should contain("\e[?2004h")
    content.should contain("\e[?2004l")
    content.should contain("\e[?1004l")
  end

  it "supports window title and beep control sequences" do
    output_io = IO::Memory.new
    renderer = BubbleTea::Renderer.new(output_io, use_alt_screen: false, use_diff: false, hide_cursor: false)
    renderer.set_window_title("Hello")
    renderer.beep

    content = output_io.to_s
    content.should contain("\e]2;Hello\a")
    content.should contain("\a")
  end
end
