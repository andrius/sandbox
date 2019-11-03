# vim:set ft=dockerfile:
FROM crystallang/crystal:0.31.1 as builder

LABEL maintainer="Andrius Kairiukstis <k@andrius.mobi>"

WORKDIR /src
COPY . .

RUN shards build --production --static --progress --verbose --warnings=all

################################################################################
FROM alpine

LABEL maintainer="Andrius Kairiukstis <k@andrius.mobi>"

# app
COPY --from=builder /src/bin/app /app

ENTRYPOINT ["/app"]
