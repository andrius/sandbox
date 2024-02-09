# vim: set fenc=utf-8 ts=2 sw=2 sts=2 et ft=Dockerfile :
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

# EXPOSE ${FS_INTERNAL_SIP_PORT}/tcp
# EXPOSE ${FS_INTERNAL_SIP_PORT}/udp
# EXPOSE ${FS_EXTERNAL_SIP_PORT}/tcp
# EXPOSE ${FS_EXTERNAL_SIP_PORT}/udp
# EXPOSE ${FS_WS_PORT}/tcp
# EXPOSE ${FS_WSS_PORT}/tcp
# EXPOSE ${FS_RTP_START_PORT}-${FS_RTP_END_PORT}/udp
# EXPOSE ${FS_ESL_PORT}/tcp

RUN apk --update --no-cache add \
      bash \
      curl \
      freeswitch \
      freeswitch-sample-config \
      freeswitch-sounds-en-us-callie-8000 \
      freeswitch-sounds-music-8000 \
      less \
      neovim sngrep tmux \
&&  rm -f /etc/freeswitch/tls/* \
&&  find / -type d -iname '*freeswitch*' -exec chown -R freeswitch:freeswitch {} + \
&&  find /var/log -type f -exec rm -f {} + \
&&  rm -rf /var/cache/apk/* \
           /tmp/* \
           /var/tmp/*

VOLUME /etc/freeswitch/tls
VOLUME /var/lib/freeswitch/recordings

# COPY configs/autoload_configs/*   /etc/freeswitch/autoload_configs/
# COPY configs/sip_profiles         /etc/freeswitch/sip_profiles
# COPY configs/vars.xml             /etc/freeswitch/vars.xml

RUN ln -s /var/lib/freeswitch/recordings /recordings \
&&  sed -i "s|param name=\"listen-ip\" value=\"::\"|param name=\"listen-ip\" value=\"0.0.0.0\"|g" /etc/freeswitch/autoload_configs/event_socket.conf.xml \
&&  chown -R freeswitch:freeswitch /etc/freeswitch \
                                   /recordings \
                                   /var/lib/freeswitch/recordings

COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["/usr/bin/freeswitch", "-nf", "-u", "freeswitch", "-g", "freeswitch", "-reincarnate-reexec"]
# CMD ["/usr/bin/freeswitch", "-nf", "-u", "freeswitch", "-g", "freeswitch", "-reincarnate-reexec", "-nonat"]

RUN /usr/bin/freeswitch -version
