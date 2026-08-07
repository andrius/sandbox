module BubbleTea
  abstract class Model
    abstract def init : Cmd?
    abstract def update(msg : Msg) : Tuple(Model, Cmd?)
    abstract def view : String
  end
end
