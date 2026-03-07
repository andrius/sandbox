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
