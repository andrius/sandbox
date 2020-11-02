#!/bin/sh
# vim:sw=4:ts=4:et

na() {
    local SERVICE="${1}"
    local MESSAGE="${2:-"unavailable"}"
    echo "Service ${SERVICE} ${MESSAGE}. Exiting."
    return 1
}

ping_test(){
    local SERVICE="${1:-service}"
    shift
    local RETRIES="${1:-60}"

    echo "Waiting for ${SERVICE} container"
    until ping -c 1 ${SERVICE} > /dev/null 2>&1 || [ "$RETRIES" -eq 0 ]; do
        : $((RETRIES--))
        sleep 1s
    done

    [ "${RETRIES}" -ne 0 ] || na "${SERVICE}" "not started yet"
}

ping_test && echo "Successfully bootstraped, yeah!" || exit 1
