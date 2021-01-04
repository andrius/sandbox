#!/bin/sh
# vim: set fenc=utf-8 ts=2 sw=2 sts=2 et :

set -ueox pipefail

if [ -f /.dockerenv ]; then
  # Disabling SIP IPv6 support in docker container
  find /etc/freeswitch/ -type f -iname '*ipv6*' -exec mv {} {}.inactive \;
  # ESL should listen on IPv4
  sed -i "s|param name=\"listen-ip\" value=\"::\"|param name=\"listen-ip\" value=\"0.0.0.0\"|g" /etc/freeswitch/autoload_configs/event_socket.conf.xml
fi

IPADDRESS="$(ip route | grep -v default | grep $(ip route | grep default | awk '{print $NF}') | awk '{print $NF}')"
DOMAIN="$(curl --silent http://ngrok:4040/api/tunnels | jq ".tunnels | .[].public_url " | grep https | awk -F '//' '{print $NF}' | sed 's|"||g')"
#
# # sed -i "s|<X-PRE-PROCESS cmd=\"stun-set\" data=\"external_rtp_ip=stun:stun.freeswitch.org\"/>|<X-PRE-PROCESS cmd=\"set\" data=\"external_rtp_ip=host:${DOMAIN}\"/>|g" /etc/freeswitch/vars.xml
# # sed -i "s|<X-PRE-PROCESS cmd=\"stun-set\" data=\"external_sip_ip=stun:stun.freeswitch.org\"/>|<X-PRE-PROCESS cmd=\"set\" data=\"external_sip_ip=host:${DOMAIN}\"/>|g" /etc/freeswitch/vars.xml
sed -i "s|<X-PRE-PROCESS cmd=\"stun-set\" data=\"external_rtp_ip=stun:stun.freeswitch.org\"/>|<X-PRE-PROCESS cmd=\"stun-set\" data=\"external_rtp_ip=${IPADDRESS}\"/>|g" /etc/freeswitch/vars.xml
sed -i "s|<X-PRE-PROCESS cmd=\"stun-set\" data=\"external_sip_ip=stun:stun.freeswitch.org\"/>|<X-PRE-PROCESS cmd=\"stun-set\" data=\"external_sip_ip=${IPADDRESS}\"/>|g" /etc/freeswitch/vars.xml
# sed -i "s|<param name=\"ext-rtp-ip\" value=\"\$\${external_rtp_ip}\"/>|<param name=\"ext-rtp-ip\" value=\"autonat:\$\${external_rtp_ip}\"/>|g" /etc/freeswitch/sip_profiles/internal.xml
# sed -i "s|<param name=\"ext-sip-ip\" value=\"\$\${external_sip_ip}\"/>|<param name=\"ext-sip-ip\" value=\"autonat:\$\${external_sip_ip}\"/>|g" /etc/freeswitch/sip_profiles/internal.xml
sed -i "s|<param name=\"local-network-acl\" value=\"localnet.auto\"/>|<param name=\"local-network-acl\" value=\"none\"/>|g" /etc/freeswitch/sip_profiles/internal.xml
sed -i "s|<param name=\"local-network-acl\" value=\"localnet.auto\"/>|<param name=\"local-network-acl\" value=\"none\"/>|g" /etc/freeswitch/sip_profiles/external.xml
# sed -i "s|<param name=\"ws-binding\"  value=\":5066\"/>|<param name=\"ws-binding\" value=\"${IPADDRESS}:5066\"/>|g" /etc/freeswitch/sip_profiles/internal.xml

exec "$@"
