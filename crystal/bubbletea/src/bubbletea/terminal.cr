module BubbleTea
  module Terminal
    class RawModeGuard
      @stty_state : String
      @active : Bool

      def initialize(@stty_state : String)
        @active = true
      end

      def restore
        return unless @active

        Process.run("sh", ["-c", "stty #{@stty_state} </dev/tty"], output: Process::Redirect::Close, error: Process::Redirect::Close)
        @active = false
      end
    end

    def self.enable_raw_mode : RawModeGuard?
      return nil unless STDIN.tty?

      saved = IO::Memory.new
      status = Process.run("sh", ["-c", "stty -g </dev/tty"], output: saved, error: Process::Redirect::Close)
      return nil unless status.success?

      state = saved.to_s.strip
      return nil if state.empty?

      Process.run("sh", ["-c", "stty raw -echo </dev/tty"], output: Process::Redirect::Close, error: Process::Redirect::Close)
      RawModeGuard.new(state)
    rescue
      nil
    end

    def self.window_size : WindowSizeMessage?
      return nil unless STDOUT.tty?

      output_io = IO::Memory.new
      status = Process.run("sh", ["-c", "stty size </dev/tty"], output: output_io, error: Process::Redirect::Close)
      return nil unless status.success?

      parts = output_io.to_s.strip.split(/\s+/)
      return nil unless parts.size == 2

      rows = parts[0].to_i?
      cols = parts[1].to_i?
      return nil if rows.nil? || cols.nil?

      WindowSizeMessage.new(cols, rows)
    rescue
      nil
    end

    def self.on_window_change(&block : ->)
      Signal::WINCH.trap { block.call }
    rescue
      # Signal hooks are best effort in constrained environments.
    end

    def self.on_interrupt(&block : ->)
      Signal::INT.trap { block.call }
    rescue
      # Best effort in restricted environments.
    end

    def self.on_terminate(&block : ->)
      Signal::TERM.trap { block.call }
    rescue
      # Best effort in restricted environments.
    end
  end
end
