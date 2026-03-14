module BubbleTea
  class Program
    getter model : Model
    getter last_error : Exception?

    @running : Bool
    @input : IO
    @output : IO
    @options : ProgramOptions
    @renderer : Renderer
    @mailbox : Channel(Msg)
    @raw_mode_guard : Terminal::RawModeGuard?
    @suspended : Bool

    def initialize(@model : Model, @input : IO = STDIN, @output : IO = STDOUT, *, @options : ProgramOptions = ProgramOptions.new)
      @running = true
      @mailbox = Channel(Msg).new(256)
      @raw_mode_guard = nil
      @suspended = false
      @last_error = nil
      @renderer = Renderer.new(
        @output,
        use_alt_screen: @options.use_alt_screen,
        use_diff: @options.enable_renderer_diff && @output.tty?,
        hide_cursor: @options.hide_cursor
      )
    end

    def run : ProgramResult
      setup_terminal
      setup_window_size_listener
      setup_signal_handlers
      start_input_reader if @options.read_input
      @options.startup_commands.each { |cmd| schedule_cmd(cmd) }

      if cmd = @model.init
        schedule_cmd(cmd)
      end

      render

      while @running
        dispatch(@mailbox.receive)
      end

      ProgramResult.new(@model, @last_error)
    rescue ex
      @last_error = ex
      ProgramResult.new(@model, ex)
    ensure
      teardown_terminal
    end

    # Backward-compatible API: returns only the final model.
    def start : Model
      run.model
    end

    def send(msg : Msg)
      spawn { safe_send(msg) }
    end

    def quit
      send(QuitMessage.new)
    end

    private def dispatch(msg : Msg)
      msg = filter_message(msg)
      return if msg.nil?
      filtered = msg.not_nil!

      case filtered
      when QuitMessage
        @running = false
      when InterruptMessage
        if @options.quit_on_interrupt
          @running = false
        else
          updated_model, cmd = @model.update(filtered)
          @model = updated_model
          schedule_cmd(cmd) if cmd
          render
        end
      when TerminateMessage
        if @options.quit_on_terminate
          @running = false
        else
          updated_model, cmd = @model.update(filtered)
          @model = updated_model
          schedule_cmd(cmd) if cmd
          render
        end
      when SuspendProgramMessage, SuspendMessage
        suspend_runtime
      when ResumeProgramMessage, ResumeMessage
        resume_runtime
      when BatchCommandMessage
        filtered.cmds.each { |cmd| schedule_cmd(cmd) }
      when SequenceCommandMessage
        run_sequence(filtered.cmds)
      when ClearScreenMessage
        @renderer.clear
        render
      when EnterAltScreenMessage
        @renderer.enter_alt_screen
        render
      when ExitAltScreenMessage
        @renderer.exit_alt_screen
        render
      when HideCursorMessage
        @renderer.hide_cursor
      when ShowCursorMessage
        @renderer.show_cursor
      when EnableMouseTrackingMessage
        @renderer.enable_mouse_tracking
      when DisableMouseTrackingMessage
        @renderer.disable_mouse_tracking
      when EnableFocusReportingMessage
        @renderer.enable_focus_reporting
      when DisableFocusReportingMessage
        @renderer.disable_focus_reporting
      when EnableBracketedPasteMessage
        @renderer.enable_bracketed_paste
      when DisableBracketedPasteMessage
        @renderer.disable_bracketed_paste
      when SetWindowTitleMessage
        @renderer.set_window_title(filtered.title)
      when BeepMessage
        @renderer.beep
      else
        updated_model, cmd = @model.update(filtered)
        @model = updated_model
        schedule_cmd(cmd) if cmd
        render unless @suspended
      end
    end

    private def render
      @renderer.render(@model.view)
    end

    private def schedule_cmd(cmd : Cmd)
      spawn do
        begin
          msg = cmd.call
          safe_send(msg) if msg
        rescue ex
          safe_send(ErrorMessage.new(ex))
        end
      end
    end

    private def run_sequence(cmds : Array(Cmd))
      spawn do
        cmds.each do |cmd|
          begin
            msg = cmd.call
            safe_send(msg) if msg
          rescue ex
            safe_send(ErrorMessage.new(ex))
          end
        end
      end
    end

    private def start_input_reader
      spawn do
        reader = InputReader.new(@input, @options.input_mode)
        reader.each_message do |msg|
          safe_send(msg)
        end
        safe_send(QuitMessage.new)
      end
    end

    private def setup_terminal
      apply_terminal_modes
    end

    private def apply_terminal_modes
      if @options.input_mode == InputMode::Key
        @raw_mode_guard = Terminal.enable_raw_mode
      end
      @renderer.enable_mouse_tracking if @options.enable_mouse
      @renderer.enable_focus_reporting if @options.enable_focus_reporting
      @renderer.enable_bracketed_paste if @options.enable_bracketed_paste
    end

    private def teardown_terminal
      restore_terminal_modes
    end

    private def restore_terminal_modes
      @renderer.stop
      @raw_mode_guard.try(&.restore)
      @raw_mode_guard = nil
    end

    private def setup_window_size_listener
      return unless @options.listen_window_size

      initial_size = Terminal.window_size
      if initial_size
        safe_send(initial_size.not_nil!)
      end

      Terminal.on_window_change do
        size_msg = Terminal.window_size
        if size_msg
          safe_send(size_msg.not_nil!)
        end
      end
    end

    private def setup_signal_handlers
      return unless @options.trap_signals

      Terminal.on_interrupt do
        safe_send(InterruptMessage.new)
      end

      Terminal.on_terminate do
        safe_send(TerminateMessage.new)
      end

      return unless @options.trap_suspend_continue

      Terminal.on_suspend do
        safe_send(SuspendMessage.new)
      end

      Terminal.on_continue do
        safe_send(ResumeMessage.new)
      end
    end

    private def safe_send(msg : Msg)
      @mailbox.send(msg)
    rescue Channel::ClosedError
      # Ignore late sends after shutdown.
    end

    private def filter_message(msg : Msg) : Msg?
      filter = @options.event_filter
      current : Msg? = msg

      if filter && current
        current = filter.call(current.not_nil!, @model)
      end

      @options.event_filters.each do |f|
        break if current.nil?
        current = f.call(current.not_nil!, @model)
      end

      current
    rescue
      current
    end

    private def suspend_runtime
      return if @suspended

      restore_terminal_modes
      @suspended = true
    end

    private def resume_runtime
      return unless @suspended

      apply_terminal_modes
      @suspended = false
      render
    end
  end
end
