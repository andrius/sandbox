module BubbleTea
  alias EventFilter = Proc(Msg, Model, Msg?)

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
    property enable_focus_reporting : Bool
    property enable_bracketed_paste : Bool
    property trap_signals : Bool
    property trap_suspend_continue : Bool
    property quit_on_interrupt : Bool
    property quit_on_terminate : Bool
    property color_enabled : Bool?
    property read_input : Bool
    property event_filter : EventFilter?
    property event_filters : Array(EventFilter)
    property startup_commands : Array(Cmd)

    def initialize(
      @input_mode : InputMode = InputMode::Line,
      @use_alt_screen : Bool = false,
      @enable_renderer_diff : Bool = true,
      @hide_cursor : Bool = false,
      @listen_window_size : Bool = true,
      @enable_mouse : Bool = false,
      @enable_focus_reporting : Bool = false,
      @enable_bracketed_paste : Bool = false,
      @trap_signals : Bool = true,
      @trap_suspend_continue : Bool = true,
      @quit_on_interrupt : Bool = true,
      @quit_on_terminate : Bool = true,
      @color_enabled : Bool? = nil,
      @read_input : Bool = true,
      @event_filter : EventFilter? = nil,
      @event_filters : Array(EventFilter) = [] of EventFilter,
      @startup_commands : Array(Cmd) = [] of Cmd
    )
    end
  end
end
