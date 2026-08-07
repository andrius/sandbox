module BubbleTea
  class BatchCommandMessage < Message
    getter cmds : Array(Cmd)

    def initialize(@cmds : Array(Cmd))
    end
  end

  class SequenceCommandMessage < Message
    getter cmds : Array(Cmd)

    def initialize(@cmds : Array(Cmd))
    end
  end

  class ClearScreenMessage < Message
  end

  class EnterAltScreenMessage < Message
  end

  class ExitAltScreenMessage < Message
  end

  class HideCursorMessage < Message
  end

  class ShowCursorMessage < Message
  end

  class EnableMouseTrackingMessage < Message
  end

  class DisableMouseTrackingMessage < Message
  end

  class EnableMouseAllMotionTrackingMessage < Message
  end

  class EnableFocusReportingMessage < Message
  end

  class DisableFocusReportingMessage < Message
  end

  class EnableBracketedPasteMessage < Message
  end

  class DisableBracketedPasteMessage < Message
  end

  class SetWindowTitleMessage < Message
    getter title : String

    def initialize(@title : String)
    end
  end

  class BeepMessage < Message
  end

  class SuspendProgramMessage < Message
  end

  class ResumeProgramMessage < Message
  end

  class PrintMessage < Message
    getter text : String
    getter newline : Bool

    def initialize(@text : String, @newline : Bool)
    end
  end

  class RequestWindowSizeMessage < Message
  end

  def self.quit : Cmd
    -> { QuitMessage.new.as(Msg?) }
  end

  def self.clear_screen : Cmd
    -> { ClearScreenMessage.new.as(Msg?) }
  end

  def self.enter_alt_screen : Cmd
    -> { EnterAltScreenMessage.new.as(Msg?) }
  end

  def self.exit_alt_screen : Cmd
    -> { ExitAltScreenMessage.new.as(Msg?) }
  end

  def self.hide_cursor : Cmd
    -> { HideCursorMessage.new.as(Msg?) }
  end

  def self.show_cursor : Cmd
    -> { ShowCursorMessage.new.as(Msg?) }
  end

  def self.enable_mouse_tracking : Cmd
    -> { EnableMouseTrackingMessage.new.as(Msg?) }
  end

  def self.disable_mouse_tracking : Cmd
    -> { DisableMouseTrackingMessage.new.as(Msg?) }
  end

  def self.enable_mouse_all_motion_tracking : Cmd
    -> { EnableMouseAllMotionTrackingMessage.new.as(Msg?) }
  end

  def self.enable_focus_reporting : Cmd
    -> { EnableFocusReportingMessage.new.as(Msg?) }
  end

  def self.disable_focus_reporting : Cmd
    -> { DisableFocusReportingMessage.new.as(Msg?) }
  end

  def self.enable_bracketed_paste : Cmd
    -> { EnableBracketedPasteMessage.new.as(Msg?) }
  end

  def self.disable_bracketed_paste : Cmd
    -> { DisableBracketedPasteMessage.new.as(Msg?) }
  end

  def self.set_window_title(title : String) : Cmd
    -> { SetWindowTitleMessage.new(title).as(Msg?) }
  end

  def self.beep : Cmd
    -> { BeepMessage.new.as(Msg?) }
  end

  def self.suspend : Cmd
    -> { SuspendProgramMessage.new.as(Msg?) }
  end

  def self.resume : Cmd
    -> { ResumeProgramMessage.new.as(Msg?) }
  end

  def self.print(text : String) : Cmd
    -> { PrintMessage.new(text, false).as(Msg?) }
  end

  def self.println(text : String) : Cmd
    -> { PrintMessage.new(text, true).as(Msg?) }
  end

  def self.printf(format : String, *args) : Cmd
    formatted = format % args
    -> { PrintMessage.new(formatted, false).as(Msg?) }
  end

  def self.request_window_size : Cmd
    -> { RequestWindowSizeMessage.new.as(Msg?) }
  end

  def self.exec_process(command : String, args : Array(String) = [] of String) : Cmd
    -> do
      output_io = IO::Memory.new
      error_io = IO::Memory.new
      status = Process.run(command, args, output: output_io, error: error_io)
      ExecProcessResultMessage.new(
        command,
        args,
        output_io.to_s,
        error_io.to_s,
        status.exit_code,
        status.success?
      ).as(Msg?)
    rescue ex
      ErrorMessage.new(ex).as(Msg?)
    end
  end

  def self.exec(command_line : String) : Cmd
    exec_process("sh", ["-lc", command_line])
  end

  def self.batch(*cmds : Cmd?) : Cmd?
    filtered = cmds.to_a.compact
    return nil if filtered.empty?

    -> { BatchCommandMessage.new(filtered).as(Msg?) }
  end

  def self.batch(cmds : Enumerable(Cmd?)) : Cmd?
    filtered = cmds.compact.to_a
    return nil if filtered.empty?

    -> { BatchCommandMessage.new(filtered).as(Msg?) }
  end

  def self.sequence(*cmds : Cmd?) : Cmd?
    filtered = cmds.to_a.compact
    return nil if filtered.empty?

    -> { SequenceCommandMessage.new(filtered).as(Msg?) }
  end

  def self.sequence(cmds : Enumerable(Cmd?)) : Cmd?
    filtered = cmds.compact.to_a
    return nil if filtered.empty?

    -> { SequenceCommandMessage.new(filtered).as(Msg?) }
  end

  def self.tick(after : Time::Span, &block : -> Msg?) : Cmd
    -> do
      sleep(after)
      block.call
    end
  end

  def self.every(interval : Time::Span, &block : Time -> Msg?) : Cmd
    -> do
      sleep(interval)
      block.call(Time.utc)
    end
  end
end
