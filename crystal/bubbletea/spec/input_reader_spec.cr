require "./spec_helper"

describe BubbleTea::InputReader do
  it "emits user input messages in line mode" do
    io = IO::Memory.new("hello\nworld\n")
    reader = BubbleTea::InputReader.new(io, BubbleTea::InputMode::Line)
    messages = [] of BubbleTea::Msg

    reader.each_message { |msg| messages << msg }

    messages.size.should eq(2)
    messages[0].should be_a(BubbleTea::UserInputMessage)
    messages[1].should be_a(BubbleTea::UserInputMessage)
    messages[0].as(BubbleTea::UserInputMessage).data.should eq("hello")
  end

  it "parses common key events in key mode" do
    raw = "a\t \n\e[A\e[B\e[C\e[D"
    io = IO::Memory.new(raw)
    reader = BubbleTea::InputReader.new(io, BubbleTea::InputMode::Key)
    key_types = [] of BubbleTea::KeyType

    reader.each_message do |msg|
      next unless msg.is_a?(BubbleTea::KeyMessage)
      key_types << msg.type
    end

    key_types.should eq([
      BubbleTea::KeyType::Rune,
      BubbleTea::KeyType::Tab,
      BubbleTea::KeyType::Space,
      BubbleTea::KeyType::Enter,
      BubbleTea::KeyType::Up,
      BubbleTea::KeyType::Down,
      BubbleTea::KeyType::Right,
      BubbleTea::KeyType::Left,
    ])
  end

  it "parses mouse sgr events" do
    io = IO::Memory.new("\e[<0;10;5M\e[<0;10;5m\e[<64;15;8M")
    reader = BubbleTea::InputReader.new(io, BubbleTea::InputMode::Key)
    mouse_messages = [] of BubbleTea::MouseMessage

    reader.each_message do |msg|
      mouse_messages << msg.as(BubbleTea::MouseMessage) if msg.is_a?(BubbleTea::MouseMessage)
    end

    mouse_messages.size.should eq(3)

    first = mouse_messages[0]
    first.button.should eq(BubbleTea::MouseButton::Left)
    first.action.should eq(BubbleTea::MouseAction::Press)
    first.x.should eq(10)
    first.y.should eq(5)

    second = mouse_messages[1]
    second.action.should eq(BubbleTea::MouseAction::Release)

    third = mouse_messages[2]
    third.button.should eq(BubbleTea::MouseButton::WheelUp)
    third.action.should eq(BubbleTea::MouseAction::Press)
  end
end
