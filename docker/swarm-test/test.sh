#!/bin/sh

docker service create --name web --network swarm --replicas 4 -p 5001:80 francois/apache-hostname
docker service ls

curl http://localhost:5001
