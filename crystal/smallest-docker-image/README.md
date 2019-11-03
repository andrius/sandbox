Smallest crystal-lang docker image
==================================

This is just a demo of dockerised crystal-lang application that communicate with
HTTP REST service.

The goal is to make a tiny but fully functional docker image.

More on [blog page](https://andrius.mobi/2019/10/Create-the-smallest-Crystal-lang-docker-image-based-on-scratch.html)

## What application do?

It just browse and print results from
[JSONPlaceholder API page](http://jsonplaceholder.typicode.com/posts/1).

[JSONPlaceholder](https://jsonplaceholder.typicode.com) is a free online
REST API that you can use whenever you need some fake data. It's great for
tutorials, testing new libraries, sharing code examples, etc.

## Installation

You need a docker installed, then simply execute `make` command. It will build
all the images and execute tests

## Results

### Image sizes

```
$ docker images smallest-docker-image

REPOSITORY              TAG                     IMAGE ID            CREATED             SIZE
smallest-docker-image   0.31.1                  0d90ffab69e1        21 minutes ago      539MB
smallest-docker-image   scratch-ldd             d819bf2a43f3        21 minutes ago      10MB
smallest-docker-image   scratch-static          ad11beee9e7c        13 minutes ago      6.38MB
smallest-docker-image   scratch-static-no-dns   595afcfad6f0        13 minutes ago      6.25MB
smallest-docker-image   busybox-ldd             db9d081face4        9 minutes ago       11.2MB
smallest-docker-image   busybox-static          128f2cd99e28        8 minutes ago       7.6MB
smallest-docker-image   busybox-static-no-dns   683f2f1aa76b        8 minutes ago       7.47MB
smallest-docker-image   alpine-ldd              b101de9f96ab        8 minutes ago       15.6MB
smallest-docker-image   alpine-static           da065ba7534a        7 minutes ago       11.9MB
smallest-docker-image   alpine-static-no-dns    eea30ca4db2b        7 minutes ago       11.8MB
```

### Tests

Conclusion:

Only ldd-based images works. `-- static` compilation option won't help

```
❯ make test
./tests/bats/bats tests/docker.bats
 ✓ Docker image smallest-docker-image:0.31.1 could browse API
 ✓ Docker image smallest-docker-image:alpine-ldd could browse API
 ✗ Docker image smallest-docker-image:alpine-static could browse API
   (in test file tests/docker.bats, line 28)
     `[ "$status" -eq 0 ]' failed
 ✗ Docker image smallest-docker-image:alpine-static-no-dns could browse API
   (in test file tests/docker.bats, line 33)
     `[ "$status" -eq 0 ]' failed
 ✓ Docker image smallest-docker-image:busybox-ldd could browse API
 ✗ Docker image smallest-docker-image:busybox-static could browse API
   (in test file tests/docker.bats, line 43)
     `[ "$status" -eq 0 ]' failed
 ✗ Docker image smallest-docker-image:busybox-static-no-dns could browse API
   (in test file tests/docker.bats, line 48)
     `[ "$status" -eq 0 ]' failed
 ✓ Docker image smallest-docker-image:scratch-ldd could browse API
 ✗ Docker image smallest-docker-image:scratch-static could browse API
   (in test file tests/docker.bats, line 58)
     `[ "$status" -eq 0 ]' failed
 ✗ Docker image smallest-docker-image:scratch-static-no-dns could browse API
   (in test file tests/docker.bats, line 63)
     `[ "$status" -eq 0 ]' failed

10 tests, 6 failures
Makefile:70: recipe for target 'test' failed
make: *** [test] Error 1
```
