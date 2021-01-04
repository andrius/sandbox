# vim: set fenc=utf-8 ts=2 sw=2 sts=2 et ft=Dockerfile :
FROM alpine:3.12

LABEL maintainer="Andrius Kairiukstis <k@andrius.mobi>"

RUN apk --update --no-cache add \
      curl \
      jq \
      freeswitch \
      freeswitch-sample-config \
      freeswitch-sounds-en-us-callie-8000 \
      freeswitch-sounds-music-8000 \
      less \
&&  find /var/log -type f -exec rm -f {} + \
&&  rm -rf /var/cache/apk/* \
           /tmp/* \
           /var/tmp/*

HEALTHCHECK --interval=5m --timeout=3s --start-period=45s --retries=3 \
  CMD nc -w 1 localhost 5060 && \
      nc -w 1 localhost 5066 && \
      nc -w 1 localhost 8021 || exit 1

COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]

# CMD ["/usr/bin/freeswitch", "-nf", "-u", "freeswitch", "-g", "freeswitch", "-reincarnate-reexec"]
CMD ["/usr/bin/freeswitch", "-nf", "-u", "freeswitch", "-g", "freeswitch", "-reincarnate-reexec", "-nonat"]

RUN /usr/bin/freeswitch -version
