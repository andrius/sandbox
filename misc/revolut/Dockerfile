# vim:set ft=dockerfile:
FROM alpine:edge as builder

LABEL maintainer="Andrius Kairiukstis <k@andrius.mobi>"

RUN apk add --no-cache \
        build-base \
        ca-certificates \
        crystal \
        shards \
        gnu-libiconv gnu-libiconv-dev \
        libc-dev \
        libressl libressl-dev \
        zlib zlib-dev

WORKDIR /src

COPY . .

RUN mkdir bin

RUN shards build \
        --production \
        --release \
        --no-debug \
        --warnings=all \
        --error-trace

RUN ldd ./bin/app | tr -s '[:blank:]' '\n' | grep '^/' | \
    xargs -I % sh -c 'mkdir -p $(dirname deps%); cp % deps%;'


################################################################################
FROM scratch

LABEL maintainer="Andrius Kairiukstis <k@andrius.mobi>"

# COPY --from=builder /usr/lib/libevent_openssl* /usr/lib/
# COPY --from=builder /usr/lib/libresolv* /usr/lib/
# COPY --from=builder /lib/libssl* /lib/
# COPY --from=builder /lib/libtls* /lib/
COPY --from=builder /etc/ssl/*   /etc/ssl/

# dependences
COPY --from=builder /src/deps /

# app
COPY --from=builder /src/bin/app /app

ENTRYPOINT ["/app"]
