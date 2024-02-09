#!/bin/sh
# vim: set fenc=utf-8 ts=2 sw=2 sts=2 et :

set -ueox pipefail

cat /etc/letsencrypt/live/${DOMAIN}/cert.pem     > /etc/freeswitch/tls/wss.pem
cat /etc/letsencrypt/live/${DOMAIN}/privkey.pem >> /etc/freeswitch/tls/wss.pem
cat /etc/letsencrypt/live/${DOMAIN}/chain.pem   >> /etc/freeswitch/tls/wss.pem

if [ -f /.dockerenv ]; then
  echo "Disabling SIP IPv6 support in docker container";
  find /etc/freeswitch/ -type f -iname '*ipv6*' -exec mv {} {}.inactive \;
fi

sed -i "s|<!-- <param name=\"rtp-start-port\" value=\"16384\"/> -->|<param name=\"rtp-start-port\" value=\"${FS_RTP_START_PORT}\"/>|g" /etc/freeswitch/autoload_configs/switch.conf.xml
sed -i "s|<!-- <param name=\"rtp-end-port\" value=\"32768\"/> -->|<param name=\"rtp-start-port\" value=\"${FS_RTP_END_PORT}\"/>|g" /etc/freeswitch/autoload_configs/switch.conf.xml

sed -i "s|<X-PRE-PROCESS cmd=\"set\" data=\"bind_server_ip=auto\"/>|<X-PRE-PROCESS cmd=\"set\" data=\"bind_server_ip=${DOMAIN}\"/>|g" /etc/freeswitch/vars.xml
sed -i "s|<X-PRE-PROCESS cmd=\"stun-set\" data=\"external_rtp_ip=stun:stun.freeswitch.org\"/>|<X-PRE-PROCESS cmd=\"set\" data=\"external_rtp_ip=${FS_HOST_IP}\"/>|g" /etc/freeswitch/vars.xml
sed -i "s|<X-PRE-PROCESS cmd=\"stun-set\" data=\"external_sip_ip=stun:stun.freeswitch.org\"/>|<X-PRE-PROCESS cmd=\"set\" data=\"external_sip_ip=${FS_HOST_IP}\"/>\n  <X-PRE-PROCESS cmd=\"set\" data=\"add_ice_candidates=true\"/>|g" /etc/freeswitch/vars.xml
sed -i "s|<X-PRE-PROCESS cmd=\"set\" data=\"domain=\$\${local_ip_v4}\"/>|<X-PRE-PROCESS cmd=\"set\" data=\"domain=${DOMAIN}\"/>|g" /etc/freeswitch/vars.xml
sed -i "s|<param name=\"ext-rtp-ip\" value=\"\$\${external_rtp_ip}\"/>|<param name=\"ext-rtp-ip\" value=\"autonat:\$\${external_rtp_ip}\"/>|g" /etc/freeswitch/sip_profiles/internal.xml
sed -i "s|<param name=\"ext-sip-ip\" value=\"\$\${external_sip_ip}\"/>|<param name=\"ext-sip-ip\" value=\"autonat:\$\${external_sip_ip}\"/>|g" /etc/freeswitch/sip_profiles/internal.xml
sed -i "s|<!--<param name=\"nat-options-ping\" value=\"true\"/>-->|<param name=\"nat-options-ping\" value=\"true\"/>|g" /etc/freeswitch/sip_profiles/internal.xml
sed -i "s|<!--<param name=\"aggressive-nat-detection\" value=\"true\"/>-->|<param name=\"aggressive-nat-detection\" value=\"true\"/>|g" /etc/freeswitch/sip_profiles/internal.xml

chown -R freeswitch:freeswitch /etc/freeswitch

exec "$@"
