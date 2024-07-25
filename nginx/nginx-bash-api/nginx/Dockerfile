FROM nginx:1.26.1-alpine

RUN set -x \
&&  apk add --no-cache \
      apache2-utils \
      curl \
      netcat-openbsd \
      openssl \
&&  rm -rf /var/cache/apk/* \
           /tmp/* \
           /var/tmp/*

RUN curl -s https://raw.githubusercontent.com/nginxinc/docker-nginx/master/mainline/alpine/docker-entrypoint.sh > "/nginx-entrypoint.sh" \
&&  chmod +x /nginx-entrypoint.sh
COPY /docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
