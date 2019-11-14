module Revolut
  module Telegram
    extend self

    TELEGRAM_AUTH    = ENV.fetch("TELEGRAM_AUTH")
    TELEGRAM_CHAT_ID = ENV.fetch("TELEGRAM_CHAT_ID")
    TELEGRAM_API     = "https://api.telegram.org/bot#{TELEGRAM_AUTH}/sendMessage"

    def announce(text)
      HTTP::Client.get TELEGRAM_API,
        tls: OpenSSL::SSL::Context::Client.new,
        headers: HTTP::Headers{
          "Content-Type" => "application/json",
          "accept"       => "application/json",
        },
        body: {
          parse_mode:               "Markdown",
          chat_id:                  TELEGRAM_CHAT_ID,
          disable_web_page_preview: 1,
          text:                     text,
        }.to_json
    end
  end
end
