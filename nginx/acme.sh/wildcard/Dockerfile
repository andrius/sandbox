FROM nginx:alpine

ARG SSL_DIR=/ssl
ENV SSL_DIR=${SSL_DIR}

RUN apk --update --no-cache add \
	    curl \
    	git \
      ca-certificates \
			openssl \
&&  mkdir -p "${SSL_DIR}" \
&&  git clone --depth 1 https://github.com/acmesh-official/acme.sh.git /tmp/acme.sh \
&&  cd /tmp/acme.sh \
&&  ./acme.sh --install --home /acme.sh --cert-home "${SSL_DIR}" \
&&  cd / \
&&  apk del git

WORKDIR /acme.sh

COPY docker-entrypoint.sh /

ENTRYPOINT ["/docker-entrypoint.sh"]
