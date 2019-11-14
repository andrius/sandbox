require "./revolut"

LOOP_WAIT = ENV.fetch("LOOP_WAIT", "60").to_i

[Signal::INT, Signal::KILL, Signal::TERM].each do |signal|
  signal.trap do |s|
    puts
    puts "Signal::#{s} signal received. Terminating..."
    puts
    exit
  end
end

puts
puts
puts "Starting service"
puts "Press ctrl-c or execute docker stop CONTAINER to terminate"
puts
puts

Revolut::Balance.get

message = ["*Revolut for business accounts statement:*"]
Revolut::Balance.accounts.map do |_, account|
  message << "*%{name}* balance is %<balance>0.2f %{currency}" % {
    name:     account.name,
    balance:  account.balance,
    currency: account.currency,
  }
end
message << "---\n"

message = message.join("\n")

Revolut::Telegram.announce(message)

loop do
  sleep LOOP_WAIT
  puts "New loop:"
  diff = Revolut::Balance.update
  if diff.nil? || diff.empty?
    puts "nothing new"
  else
    pp diff

    message = ["*Revolut for business account(s) update:*"]
    diff.map do |account|
      message << "*%{name}* change by %<diff>0.2f. New balance is %<balance>0.2f %{currency}" % {
        name:     account.name,
        diff:     account.diff,
        balance:  account.balance,
        currency: account.currency,
      }
    end
    message << "---\n"

    message = message.join("\n")

    Revolut::Telegram.announce(message)
  end
  puts "---"
end
