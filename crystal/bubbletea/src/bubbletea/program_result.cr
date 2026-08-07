module BubbleTea
  struct ProgramResult
    getter model : Model
    getter error : Exception?

    def initialize(@model : Model, @error : Exception? = nil)
    end

    def ok? : Bool
      @error.nil?
    end

    def to_tuple : Tuple(Model, Exception?)
      {@model, @error}
    end
  end
end
