module BubbleTea
  module Style
    RESET = "\e[0m"

    def self.enabled_for?(io : IO) : Bool
      force_color = ENV["FORCE_COLOR"]?
      return true if force_color && force_color != "0"
      return false if ENV["NO_COLOR"]?

      io.tty?
    end

    def self.decorate(text : String, enabled : Bool, *codes : String) : String
      return text unless enabled
      return text if codes.empty?

      "\e[#{codes.join(";")}m#{text}#{RESET}"
    end

    def self.bold(text : String, enabled : Bool) : String
      decorate(text, enabled, "1")
    end

    def self.dim(text : String, enabled : Bool) : String
      decorate(text, enabled, "2")
    end

    def self.red(text : String, enabled : Bool) : String
      decorate(text, enabled, "31")
    end

    def self.green(text : String, enabled : Bool) : String
      decorate(text, enabled, "32")
    end

    def self.yellow(text : String, enabled : Bool) : String
      decorate(text, enabled, "33")
    end

    def self.blue(text : String, enabled : Bool) : String
      decorate(text, enabled, "34")
    end

    def self.magenta(text : String, enabled : Bool) : String
      decorate(text, enabled, "35")
    end

    def self.cyan(text : String, enabled : Bool) : String
      decorate(text, enabled, "36")
    end
  end
end
