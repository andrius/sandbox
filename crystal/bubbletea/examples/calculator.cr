require "../src/bubbletea"

# Demo app defaults to colorful output. Set DEMO_NO_COLOR=1 to disable.
color_enabled = ENV["DEMO_NO_COLOR"]? != "1"
input_mode = ENV["DEMO_LINE_MODE"]? == "1" ? BubbleTea::InputMode::Line : BubbleTea::InputMode::Key
use_alt_screen = input_mode == BubbleTea::InputMode::Key && ENV["DEMO_NO_ALT_SCREEN"]? != "1"
hide_cursor = input_mode == BubbleTea::InputMode::Key && ENV["DEMO_HIDE_CURSOR"]? != "0"

options = BubbleTea::ProgramOptions.new(
  input_mode: input_mode,
  use_alt_screen: use_alt_screen,
  hide_cursor: hide_cursor
)

BubbleTea::Program.new(
  BubbleTea::CalculatorModel.new(color_enabled: color_enabled),
  options: options
).start
