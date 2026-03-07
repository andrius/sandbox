require "./spec_helper"

private def run_calculator_app(input_script : String) : String
  input = IO::Memory.new(input_script)
  output = IO::Memory.new

  BubbleTea::Program.new(BubbleTea::CalculatorModel.new, input, output).start

  output.to_s
end

describe "calculator app integration" do
  it "runs addition flow end-to-end" do
    output = run_calculator_app("12\n+\n7\n=\nq\n")

    output.should contain("Display   : 19")
    output.should contain("12 + 7 = 19")
    output.should contain("Error     : (none)")
  end

  it "shows divide-by-zero in rendered app output" do
    output = run_calculator_app("8\n/\n0\n=\nq\n")

    output.should contain("Error     : Cannot divide by zero.")
  end
end
