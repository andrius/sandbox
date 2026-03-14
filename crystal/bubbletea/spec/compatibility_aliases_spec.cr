require "./spec_helper"

describe "BubbleTea compatibility aliases" do
  it "exposes *Msg aliases for core message types" do
    BubbleTea::KeyMsg.should eq(BubbleTea::KeyMessage)
    BubbleTea::WindowSizeMsg.should eq(BubbleTea::WindowSizeMessage)
    BubbleTea::MouseMsg.should eq(BubbleTea::MouseMessage)
    BubbleTea::PasteMsg.should eq(BubbleTea::PasteMessage)
    BubbleTea::QuitMsg.should eq(BubbleTea::QuitMessage)
    BubbleTea::ErrorMsg.should eq(BubbleTea::ErrorMessage)
  end
end
