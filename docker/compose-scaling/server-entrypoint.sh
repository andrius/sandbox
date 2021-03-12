#!/bin/bash

ipaddress=$(/sbin/ifconfig eth0 | grep 'inet addr:' | awk '{print $2}')
echo "Web service listening on IP ${ipaddress}"

while true
do
    echo -e "HTTP/1.1 200 OK\n\nWeb service listening on IP ${ipaddress}" | nc -l -p 9000 -q 1
done
