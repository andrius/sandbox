nginx with bash endpoint
========================

# Motivation

I want to control nginx docker container from another connected docker
container, i.e. reload it when letsencrypt certbot renews SSL certificate

# How to use it

1. Create and edit `.env` file: `cp .env-sample .env && vim .env`

2. Start docker-compose services. The client service, "certbot" dependant on the nginx service and would start once it will get into healthy state.

    ```bash
    docker-compose up -d && docker-compose logs -ft
    ```
    
3. In a while client will request API service to reload nginx. In this POC it happens [right in the docker-compose.yml](https://github.com/andrius/sandbox/blob/develop/nginx-bash-api/docker-compose.yml#L39)

4. API that reloads nginx is just a [basic bash/netcat script](https://github.com/andrius/sandbox/blob/develop/nginx-bash-api/nginx/docker-entrypoint.sh#L7-L16), feel free to improve it :)


# Demo

[![asciicast](https://asciinema.org/a/369376.svg)](https://asciinema.org/a/369376)
