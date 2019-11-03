# vim:set ft=dockerfile:
FROM crystallang/crystal:0.31.1

LABEL maintainer="Andrius Kairiukstis <k@andrius.mobi>"

WORKDIR /src

COPY . .

ENTRYPOINT ["/src/docker-entrypoint.sh"]
CMD ["crystal", "run", "./src/app.cr"]

