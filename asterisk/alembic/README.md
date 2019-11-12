asterisk-alembic
================

This project is dedicated to migrate Asterisk PBX realtime database storage
backend. In order to setup migrations we do need Alembic, a database migration
tool that Asterisk developers use since Asterisk version 12.

## Installation

Just build docker image:

- With docker-compose:

    ```bash
    docker-compose build --force-rm --pull --no-cache
    ```

- With docker:

    ```bash
    docker build --pull --force-rm -t alembic --file ./Dockerfile .
    ```

## Usage

- To run with docker-compose do:

    ```bash
    CURRENT_UID=$(id -u):$(id -g) docker-compose run --rm alembic
    ```

- and to run with docker do:

    ```bash
    docker container run --rm -it \
      -v ${PWD}/data:/data \        # It will store data to the /data folder
      --user $(id -u):$(id -g) \    # Run as current user
      alembic
    ```

In both cases, resulting SQL files for MySQL/MaridDB and Postgres will be placed
within `/data` folder.

In case if target is to manage database migrations and versions, you need to
uncomment MariaDB and Postgres services in docker-compose file, set credentials
and execute alembic within docker-compose:

- Run it:

    ```bash
    docker-compose up -d mariadb    # or postgres
    CURRENT_UID=$(id -u):$(id -g) docker-compose run --rm alembic sh
    ```

- add vim and edit configuration file:

    ```bash
    apk --update add vim
    vim config-mysql.ini   # or config-postgresql.ini
    # sqlalchemy.url would look like:
    # sqlalchemy.url = mysql://root:password@SERVICENAME/asterisk
    # where SERVICENAME is mariadb or postgres (as described in docker-compose.yml)
    ```

- execute alembic, i.e.:

    ```bash
    alembic -c config.ini upgrade head
    ```

- inspect database:

    ```bash
    mysql -h mariadb -u root -p -D asterisk
    ```

## References


- [Managing Realtime Databases with Alembic](https://wiki.asterisk.org/wiki/display/AST/Managing+Realtime+Databases+with+Alembic);
- [Setting up PJSIP Realtime](https://wiki.asterisk.org/wiki/display/AST/Setting+up+PJSIP+Realtime#SettingupPJSIPRealtime-InstallingandUsingAlembic);
- [Asterisk 13 - Configuración ARA (Asterisk Realtime Arquitecture)](https://www.voztovoice.org/?q=node/850);
- [Mirror of the official Asterisk project repository](https://github.com/asterisk/asterisk);
- [Alembic project homepage](https://alembic.sqlalchemy.org/en/latest).
