FROM alpine:3.12

LABEL maintainer="Andrius Kairiukstis <k@andrius.mobi>"

ARG FS_INTERNAL_SIP_PORT=${FS_INTERNAL_SIP_PORT:-5060}
ARG FS_EXTERNAL_SIP_PORT=${FS_EXTERNAL_SIP_PORT:-5080}
ARG FS_WS_PORT=${FS_WS_PORT:-5066}
ARG FS_WSS_PORT=${FS_WSS_PORT:-7443}
ARG FS_RTP_START_PORT=${FS_RTP_START_PORT:-16384}
ARG FS_RTP_END_PORT=${FS_RTP_END_PORT:-16640}
ARG FS_ESL_PORT=${FS_ESL_PORT:-8021}
ARG FS_ESL_PASSWORD=${FS_ESL_PASSWORD:-ClueCon}

EXPOSE ${FS_INTERNAL_SIP_PORT}/tcp
EXPOSE ${FS_INTERNAL_SIP_PORT}/udp
EXPOSE ${FS_EXTERNAL_SIP_PORT}/tcp
EXPOSE ${FS_EXTERNAL_SIP_PORT}/udp
EXPOSE ${FS_WS_PORT}/tcp
EXPOSE ${FS_WSS_PORT}/tcp
EXPOSE ${FS_RTP_START_PORT}-${FS_RTP_END_PORT}/udp
EXPOSE ${FS_ESL_PORT}/tcp

RUN apk --update --no-cache add \
      bash \
      curl \
      freeswitch \
      freeswitch-sample-config \
      less \
      sngrep \
&&  sed -i "s|param name=\"listen-ip\" value=\"::\"|param name=\"listen-ip\" value=\"0.0.0.0\"|g" /etc/freeswitch/autoload_configs/event_socket.conf.xml \
&&  sed -i "s|<!--param name=\"nat-options-ping\" value=\"true\"/>-->|<param name=\"nat-options-ping\" value=\"true\"/>|g" /etc/freeswitch/sip_profiles/internal.xml \
&&  mkdir -p /etc/freeswitch/tls \
&&  rm -f /etc/freeswitch/tls/* \
&&  find / -type d -iname '*freeswitch*' -exec chown -R freeswitch:freeswitch {} + \
&&  find /var/log -type f -exec rm -f {} + \
&&  rm -rf /var/cache/apk/* \
           /tmp/* \
           /var/tmp/*

VOLUME /etc/freeswitch/tls
VOLUME /var/lib/freeswitch/recordings

RUN chown -R freeswitch:freeswitch /etc/freeswitch \
                                   /var/lib/freeswitch/recordings

COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["/usr/bin/freeswitch", "-nf", "-u", "freeswitch", "-g", "freeswitch", "-reincarnate-reexec"]
# CMD ["/usr/bin/freeswitch", "-nf", "-u", "freeswitch", "-g", "freeswitch", "-reincarnate-reexec", "-nonat", "-nonatmap", "-rp"]

RUN /usr/bin/freeswitch -version
