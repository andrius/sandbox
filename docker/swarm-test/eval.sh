#!/bin/sh
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.100:2376"
export DOCKER_CERT_PATH="/Users/ak/.docker/machine/machines/swarm1"
export DOCKER_MACHINE_NAME="swarm1"
eval $(docker-machine env swarm1)
