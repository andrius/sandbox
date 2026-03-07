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
end
