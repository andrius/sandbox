# vim:set ft=dockerfile:
FROM andrius/crystal-lang:0.31.1

LABEL maintainer="Andrius Kairiukstis <k@andrius.mobi>"

WORKDIR /src

COPY . .

CMD ["crystal", "./src/signal_trap.cr"]
