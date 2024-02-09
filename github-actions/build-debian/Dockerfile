# vim:set fenc=utf-8 ts=2 sw=2 sts=2 et ft=dockerfile:
FROM debian/eol:jessie

ENV LANG=C.UTF-8
ENV DEBIAN_FRONTEND=noninteractive

# Install any necessary dependencies for building Debian packages
# RUN apt update && apt install -y ...

# Copy build script into the container
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
