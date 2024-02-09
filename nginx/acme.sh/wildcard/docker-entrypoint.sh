#!/bin/sh

set -ex
CERT_HOME="${CERT_HOME:-/ssl}"

if [ "${DOMAIN}" = "" ]; then
    echo "Please specify DOMAIN through .env"
    exit 1
fi

if [ "$*" = "" ]; then
    CMD="./acme.sh --auto-upgrade --home . --cert-home "${CERT_HOME}" --dns dns_dgon --issue --domain "${DOMAIN}""
    [ "${STAGING:-0}" -eq 1 ] && CMD="${CMD} --staging"
    [ "${ACCOUNTEMAIL}" != "" ] && CMD="${CMD} --accountemail "${ACCOUNTEMAIL}""
    eval "${CMD}"
else
    exec "$@"
fi

