#!/bin/sh

set -ueo pipefail

htpasswd -bc /tmp/.htpasswd "${NGINX_USER}" "${NGINX_PASSWORD}"

# start an "api" that reload nginx
(
  # let nginx start first
  sleep 10s

  while true
  do
    { echo -e "HTTP/1.1 200 OK\n\nNGINX reload requested at: $(date)"; nginx -s reload & } | nc -l -p 9000 -q 1
  done
) &
# original entrypoint for nginx
exec /nginx-entrypoint.sh "$@"
