require "http/client"
require "json"

module API
  module Client
    extend self

    VERSION = {{ `shards version #{__DIR__}`.chomp.stringify }}

    # Broswe JSONPlaceholder API for post #1. Expecting to receive recprd with
    # id == 1 (below is curl sample). Set exit code to 0 (success) or
    # 1 (failure) so bats could test it.
    # ```bash
    # curl http://jsonplaceholder.typicode.com/posts/1
    #
    # # =>
    # # {
    # #   "userId": 1,
    # #   "id": 1,
    # #   "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    # #   "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    # # }
    # ```
    def run
      response = HTTP::Client.get("http://jsonplaceholder.typicode.com/posts/1")
      if response.success?
        data = JSON.parse(response.body)
        exit 0 if data["id"]? == 1
      end

      puts "Something wrong, received following data from the API (expecting JSON with record id == 1):"
      pp response.body
      exit 1
    end
  end
end

API::Client.run
