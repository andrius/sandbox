require "signal"

# Process signal trap for docker
# - `Signal::INT` --- to catch Ctrl-C;
# - `Signal::TERM` and `Signal::KILL` to catch docker stop
module SignalTrap
  VERSION = "0.1.0"

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
  puts "Waiting... Press ctrl-c or execute docker stop CONTAINER to terminate"
  puts
  puts
  sleep
end
