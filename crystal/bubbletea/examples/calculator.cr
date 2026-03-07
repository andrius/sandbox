require "../src/bubbletea"

# Demo app defaults to colorful output. Set DEMO_NO_COLOR=1 to disable.
color_enabled = ENV["DEMO_NO_COLOR"]? != "1"
BubbleTea::Program.new(BubbleTea::CalculatorModel.new(color_enabled: color_enabled)).start
