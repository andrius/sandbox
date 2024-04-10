# vim:set ft=dockerfile:
FROM python:3.13.0a6-alpine3.19

LABEL maintainer="Andrius Kairiukstis <k@andrius.mobi>"

WORKDIR /ast-db-manage

RUN apk --update add \
      git \
      mariadb-client \
 \
 && pip install alembic \
 \
 && git clone --depth 1 \
      https://github.com/asterisk/asterisk.git /tmp/asterisk \
 && mv /tmp/asterisk/contrib/ast-db-manage/* . \
 && cp config.ini.sample config-mysql.ini \
 && cp config.ini.sample config-postgresql.ini \
 && sed -i "s/#sqlalchemy.url = postgresql:/sqlalchemy.url = postgresql:/g" config-postgresql.ini \
 && sed -i "s/sqlalchemy.url = mysql:/#sqlalchemy.url = mysql:/g" config-postgresql.ini \
 && cd \
 \
 && apk del --purge git \
 && rm -rf /var/cache/apk/* \
           /tmp/* \
           /var/tmp/*

VOLUME /data

COPY docker-entrypoint.sh /
ENTRYPOINT /docker-entrypoint.sh
CMD ["sh"]
