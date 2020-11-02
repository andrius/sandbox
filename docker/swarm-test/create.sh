#!/bin/sh
docker-machine create -d virtualbox swarm1
docker-machine create -d virtualbox swarm2
docker-machine create -d virtualbox swarm3
docker-machine create -d virtualbox swarm4

docker-machine ssh swarm1

# ifconfig, ip address of virtualbox machine
docker swarm init --advertise-addr 192.168.99.100:2377
docker network create -d overlay swarm

docker-machine ssh swarm2 # then 3 and 4

# token from step swarm init
docker swarm join --token SWMTKN-1-blah 192.168.99.100:2377
