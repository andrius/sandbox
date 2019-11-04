Properly terminate crystal-lang service in docker
=================================================

Production-ready crystal application in docker must process correctly several
signals to shutdown properly. Here is [detailed explanation of topic](https://medium.com/@gchudnov/trapping-signals-in-docker-containers-7a57fdda7d86).

Not familiar with crystal-lang? [Here is the main file with business logic](https://github.com/andrius/sandbox/blob/develop/crystal-signal-trap/src/signal_trap.cr)

## Installation

Everything is dockerised, just get docker installed and download git repository.

## Usage

For development-mode application run this:

```bash
docker build --pull --force-rm \
  -t crystal-signal-trap \
  --file ./Dockerfile . \
&& docker run -ti --rm --name=trap crystal-signal-trap
```

But most important is to get signals trap working in production-ready docker,
which is scratch, busybox or alpine-based. To test it, run following snippet:

```bash
docker build --pull --force-rm \
  -t crystal-signal-trap \
  --file ./Dockerfile-production . \
&& docker run -ti --rm --name=trap crystal-signal-trap
```

## Demo

[![asciicast](https://asciinema.org/a/eIFSoH00QsLKpsfyypsL0i6cr.svg)](https://asciinema.org/a/eIFSoH00QsLKpsfyypsL0i6cr)
