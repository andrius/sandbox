#!/bin/sh
# vim:sw=4:ts=4:et

na() {
    local SERVICE="${1}"
    local MESSAGE="${2:-"unavailable"}"
    echo "Service ${SERVICE} ${MESSAGE}. Exiting."
    return 1
}

bootstrap_postgres(){
    local RETRIES="${_RETRIES:-30}"

    until timeout "${TIMEOUT}"s psql --command "select 1;"  > /dev/null 2>&1 || [ "$RETRIES" -eq 0 ]; do
        : $((RETRIES--))
        sleep "${TIMEOUT}"
    done

    [ "${RETRIES}" -ne 0 ] || na "postgresql" "not started yet"
}
