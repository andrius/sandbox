require "http/client"
require "openssl"
require "json"

module Revolut
  module Balance
    extend self

    REVOLUT_API  = "https://b2b.revolut.com/api/1.0/accounts"
    REVOLUT_AUTH = ENV.fetch("REVOLUT_AUTH")

    class Account
      include JSON::Serializable

      property id : String
      property name : String
      property balance : Float64
      property diff : Float64 = 0.0
      property currency : String
      property state : String
      property public : Bool

      # p Time.parse("2019-11-03T11:26:06.702366Z", "%Y-%m-%dT%T.%6NZ", Time::Location::UTC)
      @[JSON::Field(converter: Time::Format.new("%Y-%m-%dT%T.%6NZ", Time::Location::UTC))]
      property created_at : Time

      @[JSON::Field(converter: Time::Format.new("%Y-%m-%dT%T.%6NZ", Time::Location::UTC))]
      property updated_at : Time
    end

    @@accounts = {} of String => Account

    def accounts
      @@accounts
    end

    # Get current accounts status from the Revolut and saving new records to the
    # @@accounts hash
    def get
      response = HTTP::Client.get REVOLUT_API,
        tls: OpenSSL::SSL::Context::Client.new,
        headers: HTTP::Headers{"Authorization" => "Bearer #{REVOLUT_AUTH}"}

      return nil if !response.success?
      response = JSON.parse(response.body).as_a
      response.map do |account|
        account = Account.from_json(account.to_json)
        @@accounts[account.id] ||= account
        account
      end
    end

    # Update @accounts hash if something has changed. Returns list of updated
    # accounts
    def update
      get.try &.map { |account|
        account.diff = account.balance - accounts[account.id].balance
        if account.diff != 0.0
          accounts[account.id] = account
        end
      }.compact
    end
  end
end
