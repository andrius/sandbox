# vim:set ft=dockerfile:
FROM alpine:latest

LABEL maintainer="Andrius Kairiukstis <k@andrius.mobi>"

RUN apk add --update --no-cache \
      curl \
      jq \
 \
 && rm -rf /var/cache/apk/* \
           /tmp/* \
           /var/tmp/*

COPY test.sh /

CMD ["./test.sh"]
