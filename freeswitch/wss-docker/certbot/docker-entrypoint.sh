#!/usr/bin/env bash
# vim:sw=2:ts=2:et:

set -ueox pipefail

domain="${DOMAIN:-example.org}"

data_path="/etc/letsencrypt"
path="${data_path}/live/${domain}"

rsa_key_size="${CERTBOT_RSA_KEY_SIZE:-4096}"

trap exit TERM

echo "### Let's nginx bootstrap"
sleep 10s

if [ ! -f "${path}/privkey.pem" ]; then
  echo "### Requesting Let's Encrypt certificate for ${domain} ..."

  # Select appropriate email arg
  case "${CERTBOT_EMAIL}" in
    "") email_arg="--register-unsafely-without-email" ;;
    *) email_arg="--email ${CERTBOT_EMAIL}" ;;
  esac

  # Enable staging mode if needed
  if [ "${CERTBOT_STAGING}" != "0" ]; then
    staging_arg="--staging"
  else
    staging_arg=""
  fi

  certbot certonly --webroot -w /var/www/certbot \
    ${staging_arg} \
    ${email_arg} \
    -d "${domain}" \
    --rsa-key-size "${rsa_key_size}" \
    --agree-tos \
    --force-renewal

    echo "### Reloading nginx ..."
    curl --fail --silent --user "${NGINX_API_USER}:${NGINX_API_PASSWORD}" http://nginx/nginx/reload
fi

while :; do
  certbot renew
  curl --fail --silent --user "${NGINX_API_USER}:${NGINX_API_PASSWORD}" http://nginx/nginx/reload
  sleep 12h & wait ${!}
done
