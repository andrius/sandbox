require "./revolut_balance"
require "./telegram"

module Revolut
  VERSION = {{ `shards version #{__DIR__}`.chomp.stringify }}
end
