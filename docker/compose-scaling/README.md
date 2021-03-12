docker-compose scaling
======================

# Motivation

I wanted to make sure that load balancer in docker-compose works correctly
(round-robin) once service get scaled.

# Usage

Run `api`, `nginx`, then `client` and execute three `curl` requests against `nginx`.
It should respond with IP address of the `api` instance, round-robin.

## Snippets:

Start three instances of the API:
```shell
docker-compose build --force-rm --pull api && \
docker-compose up --detach --scale api=3 api
```

Check that all of them get started:

```shell
docker-compose logs api
```

Logs:

```
Attaching to compose-scaling_api_3, compose-scaling_api_1, compose-scaling_api_2
api_2     | Web service listening on IP addr:172.19.0.3
api_1     | Web service listening on IP addr:172.19.0.4
api_3     | Web service listening on IP addr:172.19.0.2
```

Run the `nginx` service:

```shell
docker-compose up -d nginx
```

Then `client`:

```shell
docker-compose build --force-rm --pull client && \
docker-compose run --service-ports --rm client sh
```

## Results

Execute three `curl` requests few times, expected results (IP address might be different):

```
/ # curl http://nginx
Web service listening on IP addr:172.19.0.4
/ # curl http://nginx
Web service listening on IP addr:172.19.0.3
/ # curl http://nginx
Web service listening on IP addr:172.19.0.2
/ # curl http://nginx
Web service listening on IP addr:172.19.0.4
/ # curl http://nginx
Web service listening on IP addr:172.19.0.3
/ # curl http://nginx
Web service listening on IP addr:172.19.0.2
/ # exit
```

