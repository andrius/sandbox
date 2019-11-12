#!/bin/sh

COMMAND=${@:-sh}

rm -rf /data/mysql.sql \
       /data/postgresql.sql
alembic -c ./config-mysql.ini      upgrade head --sql > /data/mysql.sql
alembic -c ./config-postgresql.ini upgrade head --sql > /data/postgresql.sql

exec "$COMMAND"
