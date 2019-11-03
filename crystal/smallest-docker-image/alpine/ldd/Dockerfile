# vim:set ft=dockerfile:
FROM crystallang/crystal:0.31.1 as builder

LABEL maintainer="Andrius Kairiukstis <k@andrius.mobi>"

WORKDIR /src
COPY . .

RUN shards build --production --progress --verbose --warnings=all
RUN ldd ./bin/app | tr -s '[:blank:]' '\n' | grep '^/' | \
    xargs -I % sh -c 'mkdir -p $(dirname deps%); cp % deps%;'

################################################################################
FROM alpine

LABEL maintainer="Andrius Kairiukstis <k@andrius.mobi>"

# dependences
COPY --from=builder /src/deps /
# that will fix DNS resolve issue in docker
COPY --from=builder /lib/x86_64-linux-gnu/libnss_dns.so.* /lib/x86_64-linux-gnu/
COPY --from=builder /lib/x86_64-linux-gnu/libresolv.so.*  /lib/x86_64-linux-gnu/

# app
COPY --from=builder /src/bin/app /app

ENTRYPOINT ["/app"]
