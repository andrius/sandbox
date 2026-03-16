require "spec"
require "../src/bubbletea"

def dispatch_message(model : BubbleTea::Model, message : BubbleTea::Msg) : BubbleTea::Model
  current = model
  next_msg : BubbleTea::Msg? = message

  while next_msg
    updated, cmd = current.update(next_msg.not_nil!)
    current = updated
    next_msg = cmd ? cmd.call : nil
  end

  current
end

def send_token(model : BubbleTea::Model, token : String) : BubbleTea::Model
  dispatch_message(model, BubbleTea::UserInputMessage.new(token))
end
