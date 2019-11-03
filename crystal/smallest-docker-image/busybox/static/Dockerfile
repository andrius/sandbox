# vim:set ft=dockerfile:
FROM crystallang/crystal:0.31.1 as builder

LABEL maintainer="Andrius Kairiukstis <k@andrius.mobi>"

WORKDIR /src
COPY . .

RUN shards build --production --static --progress --verbose --warnings=all

################################################################################
FROM busybox

LABEL maintainer="Andrius Kairiukstis <k@andrius.mobi>"

# that will fix DNS resolve issue in docker
COPY --from=builder /lib/x86_64-linux-gnu/libnss_dns.so.* /lib/x86_64-linux-gnu/
COPY --from=builder /lib/x86_64-linux-gnu/libresolv.so.*  /lib/x86_64-linux-gnu/

# app
COPY --from=builder /src/bin/app /app

ENTRYPOINT ["/app"]
