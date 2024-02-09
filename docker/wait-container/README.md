wait-container
==============

Various wait scripts for another service container.

# Overview

It is quite easy to get service start after another service with docker-compose,
enough to add [healthcheck instruction](https://docs.docker.com/engine/reference/builder/#healthcheck)
to the Dockerfile or docker-compose.yml, i.e.:

```yaml.docker-compose
main_service:
  healthcheck:
    test: ["CMD", "test", "instructions"]

dependant_service:
  depends_on:
    main_service:
      condition: service_healthy
```

But in many cases that's not enough. It is not always possible to use
dockker-compose, also `depends_on` won't cover cross-dependencies.

In such cases waiting could be implemented by `docker-entrypoint.sh`. Main ones:

- ping test;
- port test;
- service-related (i.e. database access) test;

# Healthcheck test

# Ping test

Client periodically ping server service until it responds and start operating
after given (server start) timeout. That's does not guarantee that server is
running after the timeout and ping-test should be used only in rare cases.



