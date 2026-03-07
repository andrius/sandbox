module BubbleTea
  enum InputMode
    Line
    Key
  end

  struct ProgramOptions
    property input_mode : InputMode
    property use_alt_screen : Bool
    property enable_renderer_diff : Bool
    property hide_cursor : Bool
    property listen_window_size : Bool
    property enable_mouse : Bool
    property color_enabled : Bool?
    property read_input : Bool

    def initialize(
      @input_mode : InputMode = InputMode::Line,
      @use_alt_screen : Bool = false,
      @enable_renderer_diff : Bool = true,
      @hide_cursor : Bool = false,
      @listen_window_size : Bool = true,
      @enable_mouse : Bool = false,
      @color_enabled : Bool? = nil,
      @read_input : Bool = true
    )
    end
  end
end
