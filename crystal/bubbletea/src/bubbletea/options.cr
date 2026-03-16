module BubbleTea
  alias ProgramOption = Proc(ProgramOptions, ProgramOptions)

  def self.new_program(model : Model, input : IO = STDIN, output : IO = STDOUT, *opts : ProgramOption) : Program
    options = ProgramOptions.new
    opts.each do |opt|
      options = opt.call(options)
    end

    Program.new(model, input, output, options: options)
  end

  def self.run(model : Model, input : IO = STDIN, output : IO = STDOUT, *opts : ProgramOption) : ProgramResult
    new_program(model, input, output, *opts).run
  end

  def self.start(model : Model, input : IO = STDIN, output : IO = STDOUT, *opts : ProgramOption) : Model
    new_program(model, input, output, *opts).start
  end

  def self.with_input_mode(mode : InputMode) : ProgramOption
    ->(opts : ProgramOptions) do
      opts.input_mode = mode
      opts
    end
  end

  def self.with_alt_screen(enabled : Bool = true) : ProgramOption
    ->(opts : ProgramOptions) do
      opts.use_alt_screen = enabled
      opts
    end
  end

  def self.with_window_title(title : String) : ProgramOption
    ->(opts : ProgramOptions) do
      opts.window_title = title
      opts
    end
  end

  def self.with_renderer_diff(enabled : Bool = true) : ProgramOption
    ->(opts : ProgramOptions) do
      opts.enable_renderer_diff = enabled
      opts
    end
  end

  def self.without_renderer : ProgramOption
    ->(opts : ProgramOptions) do
      opts.disable_renderer = true
      opts
    end
  end

  def self.with_mouse_cell_motion : ProgramOption
    ->(opts : ProgramOptions) do
      opts.enable_mouse = true
      opts.mouse_mode = MouseMode::CellMotion
      opts
    end
  end

  def self.with_mouse_all_motion : ProgramOption
    ->(opts : ProgramOptions) do
      opts.enable_mouse = true
      opts.mouse_mode = MouseMode::AllMotion
      opts
    end
  end

  def self.with_mouse_disabled : ProgramOption
    ->(opts : ProgramOptions) do
      opts.enable_mouse = false
      opts.mouse_mode = MouseMode::Off
      opts
    end
  end

  def self.with_focus_reporting(enabled : Bool = true) : ProgramOption
    ->(opts : ProgramOptions) do
      opts.enable_focus_reporting = enabled
      opts
    end
  end

  def self.with_bracketed_paste(enabled : Bool = true) : ProgramOption
    ->(opts : ProgramOptions) do
      opts.enable_bracketed_paste = enabled
      opts
    end
  end

  def self.with_signal_handlers(enabled : Bool = true) : ProgramOption
    ->(opts : ProgramOptions) do
      opts.trap_signals = enabled
      opts
    end
  end

  def self.without_signal_handlers : ProgramOption
    ->(opts : ProgramOptions) do
      opts.trap_signals = false
      opts
    end
  end

  def self.with_event_filter(filter : EventFilter) : ProgramOption
    ->(opts : ProgramOptions) do
      opts.event_filters = opts.event_filters + [filter]
      opts
    end
  end

  def self.with_startup_command(cmd : Cmd) : ProgramOption
    ->(opts : ProgramOptions) do
      opts.startup_commands = opts.startup_commands + [cmd]
      opts
    end
  end
end
