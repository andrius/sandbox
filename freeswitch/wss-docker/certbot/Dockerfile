FROM certbot/certbot:v1.9.0

RUN set -x \
&&  apk add --no-cache \
      curl \
      bash \
&&  rm -rf /var/cache/apk/* \
           /tmp/* \
           /var/tmp/*

COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
