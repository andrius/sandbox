#!/bin/sh

docker-compose rm --stop --force -v
docker-compose build
docker volume rm container-volumes_data
docker-compose up --no-start data
docker ps -a | grep data
docker-compose exec data find /data
docker-compose run --rm app find /data

