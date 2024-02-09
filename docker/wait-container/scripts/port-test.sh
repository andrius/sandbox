#!/usr/bin/env bash
# vim:sw=4:ts=4:et

export TIMEOUT="2"

na() {
    local SERVICE="${1}"
    local MESSAGE="${2:-"unavailable"}"
    echo "Service ${SERVICE} ${MESSAGE}. Exiting."
    return 1
}

_tcp_ready() {
    local CONTAINER="$(echo "${1}" | tr ':' '/')"
    shift
    local TIMEOUT="${1:-2}"

    echo "Waiting for ${CONTAINER} container ${TIMEOUT}"
    timeout "${TIMEOUT}"s \
        cat <(\
            true < "/dev/tcp/${CONTAINER}";\
        ) ;

    timeout "${TIMEOUT}"s \
        cat <(\
            true > /dev/null 2>&1 < "/dev/tcp/${CONTAINER}";\
        ) ;
}

tcp-port-test() {
    local SERVICE="${1:-service}"
    shift
    local RETRIES="${1:-30}"
    shift
    local TIMEOUT="${1:-2}"


    echo "Waiting for ${SERVICE} container"
    until _tcp_ready "${SERVICE}" "${TIMEOUT}" || [ "${RETRIES}" -eq 0 ]; do
        : $((RETRIES--))
        sleep "${TIMEOUT}"s
    done

    if [ "${RETRIES}" -eq 0 ]; then
        na "${SERVICE}" "timeout!"
    fi
}
echo "Testing"
tcp-port-test postgresql:5432 &
tcp-port-test redis:6379 &
tcp-port-test memcached:11211 &

wait -n

myvar="TEST$?"
echo "${!myvar}"
