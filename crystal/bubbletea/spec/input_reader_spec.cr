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

  it "parses focus events and bracketed paste payloads" do
    io = IO::Memory.new("\e[I\e[O\e[200~line1\nline2\e[201~")
    reader = BubbleTea::InputReader.new(io, BubbleTea::InputMode::Key)
    messages = [] of BubbleTea::Msg
    reader.each_message { |msg| messages << msg }

    messages[0].should be_a(BubbleTea::FocusMessage)
    messages[1].should be_a(BubbleTea::BlurMessage)
    messages[2].should be_a(BubbleTea::PasteStartMessage)
    messages[3].should be_a(BubbleTea::PasteEndMessage)
    messages[4].should be_a(BubbleTea::PasteMessage)
    messages[4].as(BubbleTea::PasteMessage).content.should eq("line1\nline2")
  end

  it "parses csi editing keys" do
    io = IO::Memory.new("\e[H\e[F\e[2~\e[3~\e[5~\e[6~")
    reader = BubbleTea::InputReader.new(io, BubbleTea::InputMode::Key)
    key_types = [] of BubbleTea::KeyType

    reader.each_message do |msg|
      next unless msg.is_a?(BubbleTea::KeyMessage)
      key_types << msg.type
    end

    key_types.should eq([
      BubbleTea::KeyType::Home,
      BubbleTea::KeyType::End,
      BubbleTea::KeyType::Insert,
      BubbleTea::KeyType::Delete,
      BubbleTea::KeyType::PageUp,
      BubbleTea::KeyType::PageDown,
    ])
  end

  it "parses function keys from ss3 and csi sequences" do
    io = IO::Memory.new("\eOP\eOQ\eOR\eOS\e[15~\e[17~\e[24~")
    reader = BubbleTea::InputReader.new(io, BubbleTea::InputMode::Key)
    key_types = [] of BubbleTea::KeyType

    reader.each_message do |msg|
      next unless msg.is_a?(BubbleTea::KeyMessage)
      key_types << msg.type
    end

    key_types.should eq([
      BubbleTea::KeyType::F1,
      BubbleTea::KeyType::F2,
      BubbleTea::KeyType::F3,
      BubbleTea::KeyType::F4,
      BubbleTea::KeyType::F5,
      BubbleTea::KeyType::F6,
      BubbleTea::KeyType::F12,
    ])
  end

  it "parses modifier flags for csi keys and alt-prefixed runes" do
    io = IO::Memory.new("\e[1;2A\e[1;3B\e[1;5C\e[1;8D\eX")
    reader = BubbleTea::InputReader.new(io, BubbleTea::InputMode::Key)
    keys = [] of BubbleTea::KeyMessage

    reader.each_message do |msg|
      keys << msg.as(BubbleTea::KeyMessage) if msg.is_a?(BubbleTea::KeyMessage)
    end

    keys.size.should eq(5)

    keys[0].type.should eq(BubbleTea::KeyType::Up)
    keys[0].shift.should be_true

    keys[1].type.should eq(BubbleTea::KeyType::Down)
    keys[1].alt.should be_true

    keys[2].type.should eq(BubbleTea::KeyType::Right)
    keys[2].ctrl.should be_true

    keys[3].type.should eq(BubbleTea::KeyType::Left)
    keys[3].shift.should be_true
    keys[3].alt.should be_true
    keys[3].ctrl.should be_true

    keys[4].type.should eq(BubbleTea::KeyType::Rune)
    keys[4].rune.should eq("X")
    keys[4].alt.should be_true
  end

  it "parses utf-8 runes and alt-prefixed utf-8 runes" do
    io = IO::Memory.new("ž\eö")
    reader = BubbleTea::InputReader.new(io, BubbleTea::InputMode::Key)
    keys = [] of BubbleTea::KeyMessage

    reader.each_message do |msg|
      keys << msg.as(BubbleTea::KeyMessage) if msg.is_a?(BubbleTea::KeyMessage)
    end

    keys.size.should eq(2)

    keys[0].type.should eq(BubbleTea::KeyType::Rune)
    keys[0].rune.should eq("ž")
    keys[0].alt.should be_false

    keys[1].type.should eq(BubbleTea::KeyType::Rune)
    keys[1].rune.should eq("ö")
    keys[1].alt.should be_true
  end
end
