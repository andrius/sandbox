require "./spec_helper"

describe BubbleTea::CalculatorModel do
  it "calculates addition and stores history" do
    model = BubbleTea::CalculatorModel.new(color_enabled: false)
    send_token(model, "12")
    send_token(model, "+")
    send_token(model, "7")
    send_token(model, "=")

    view = model.view
    view.should contain("Display   : 19")
    view.should contain("12 + 7 = 19")
    view.should contain("Error     : (none)")
  end

  it "shows divide-by-zero error without crashing" do
    model = BubbleTea::CalculatorModel.new(color_enabled: false)
    send_token(model, "8")
    send_token(model, "/")
    send_token(model, "0")
    send_token(model, "=")

    view = model.view
    view.should contain("Error     : Cannot divide by zero.")
  end

  it "supports backspace and clear entry" do
    model = BubbleTea::CalculatorModel.new(color_enabled: false)
    send_token(model, "123")
    send_token(model, "bs")
    model.view.should contain("Display   : 12")

    send_token(model, "ce")
    view = model.view
    view.should contain("Display   : 0")
    view.should contain("Expression: _ _ _")
  end

  it "clears all state with c" do
    model = BubbleTea::CalculatorModel.new(color_enabled: false)
    send_token(model, "9")
    send_token(model, "*")
    send_token(model, "5")
    send_token(model, "c")

    view = model.view
    view.should contain("Display   : 0")
    view.should contain("Expression: _ _ _")
    view.should contain("Error     : (none)")
  end

  it "emits a quit message command for q input" do
    model = BubbleTea::CalculatorModel.new(color_enabled: false)
    _updated, cmd = model.update(BubbleTea::UserInputMessage.new("q"))
    cmd.should_not be_nil

    quit_msg = cmd.not_nil!.call
    quit_msg.should be_a(BubbleTea::QuitMessage)
  end
end
