module BubbleTea
  class Renderer
    @output : IO
    @use_alt_screen : Bool
    @use_diff : Bool
    @hide_cursor : Bool
    @mouse_enabled : Bool
    @mouse_mode : MouseMode
    @focus_enabled : Bool
    @bracketed_paste_enabled : Bool
    @started : Bool
    @last_lines : Array(String)

    def initialize(@output : IO, *, use_alt_screen : Bool, use_diff : Bool, hide_cursor : Bool)
      @use_alt_screen = use_alt_screen
      @use_diff = use_diff
      @hide_cursor = hide_cursor
      @mouse_enabled = false
      @mouse_mode = MouseMode::Off
      @focus_enabled = false
      @bracketed_paste_enabled = false
      @started = false
      @last_lines = [] of String
    end

    def start
      return if @started

      if @use_alt_screen
        @output << "\e[?1049h"
        @output << "\e[2J\e[H"
      end

      @output << "\e[?25l" if @hide_cursor
      @output.flush
      @started = true
    end

    def stop
      return unless @started

      disable_bracketed_paste if @bracketed_paste_enabled
      disable_focus_reporting if @focus_enabled
      disable_mouse_tracking if @mouse_enabled
      @output << "\e[?25h" if @hide_cursor
      @output << "\e[?1049l" if @use_alt_screen
      @output.flush
      @started = false
    end

    def render(view : String)
      start unless @started

      if @use_alt_screen || @use_diff
        render_frame(view)
      else
        @output << view
        @output << '\n'
      end
      @output.flush
    end

    def clear
      @output << "\e[2J\e[H"
      @output.flush
      @last_lines = [] of String
    end

    def enter_alt_screen
      return if @use_alt_screen

      @use_alt_screen = true
      @output << "\e[?1049h"
      @output << "\e[2J\e[H"
      @output.flush
    end

    def exit_alt_screen
      return unless @use_alt_screen

      @use_alt_screen = false
      @output << "\e[?1049l"
      @output.flush
    end

    def hide_cursor
      return if @hide_cursor

      @hide_cursor = true
      @output << "\e[?25l"
      @output.flush
    end

    def show_cursor
      return unless @hide_cursor

      @hide_cursor = false
      @output << "\e[?25h"
      @output.flush
    end

    def enable_mouse_tracking
      if @mouse_enabled
        return if @mouse_mode == MouseMode::CellMotion
        disable_mouse_tracking
      end

      # Enable button-event tracking + SGR extended coordinates.
      @output << "\e[?1002h"
      @output << "\e[?1006h"
      @output.flush
      @mouse_enabled = true
      @mouse_mode = MouseMode::CellMotion
    end

    def enable_mouse_all_motion_tracking
      if @mouse_enabled
        return if @mouse_mode == MouseMode::AllMotion
        disable_mouse_tracking
      end

      @output << "\e[?1003h"
      @output << "\e[?1006h"
      @output.flush
      @mouse_enabled = true
      @mouse_mode = MouseMode::AllMotion
    end

    def disable_mouse_tracking
      return unless @mouse_enabled

      @output << "\e[?1002l"
      @output << "\e[?1003l"
      @output << "\e[?1006l"
      @output.flush
      @mouse_enabled = false
      @mouse_mode = MouseMode::Off
    end

    def enable_focus_reporting
      return if @focus_enabled

      @output << "\e[?1004h"
      @output.flush
      @focus_enabled = true
    end

    def disable_focus_reporting
      return unless @focus_enabled

      @output << "\e[?1004l"
      @output.flush
      @focus_enabled = false
    end

    def enable_bracketed_paste
      return if @bracketed_paste_enabled

      @output << "\e[?2004h"
      @output.flush
      @bracketed_paste_enabled = true
    end

    def disable_bracketed_paste
      return unless @bracketed_paste_enabled

      @output << "\e[?2004l"
      @output.flush
      @bracketed_paste_enabled = false
    end

    def set_window_title(title : String)
      safe_title = title.gsub('\a', "").gsub("\e", "")
      @output << "\e]2;#{safe_title}\a"
      @output.flush
    end

    def beep
      @output << "\a"
      @output.flush
    end

    private def render_frame(view : String)
      lines = view.lines(chomp: true)

      if @use_diff && !@last_lines.empty?
        diff_render(lines)
      else
        full_render(lines)
      end

      @last_lines = lines
    end

    private def full_render(lines : Array(String))
      @output << "\e[H"
      lines.each_with_index do |line, idx|
        @output << line
        @output << "\n" if idx < lines.size - 1
      end
      @output << "\e[J"
    end

    private def diff_render(lines : Array(String))
      max_rows = {@last_lines.size, lines.size}.max
      (0...max_rows).each do |idx|
        old_line = idx < @last_lines.size ? @last_lines[idx] : ""
        new_line = idx < lines.size ? lines[idx] : ""
        next if old_line == new_line

        @output << "\e[#{idx + 1};1H"
        @output << new_line
        @output << "\e[K"
      end
    end
  end
end
