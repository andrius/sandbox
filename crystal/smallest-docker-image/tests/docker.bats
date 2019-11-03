#!/usr/bin/env bats

# @test "API is available" {
#     run docker run -ti --rm smallest-docker-image:testimage
#     [ "$status" -eq 0 ]
# }

if [[ ! $(docker run -ti --rm smallest-docker-image:testimage) ]]
then
    echo "API is not available from this machine" >&2
    return 1
fi

# TESTS

@test "Docker image smallest-docker-image:0.31.1 could browse API" {
    run docker run -ti --rm smallest-docker-image:0.31.1
    [ "$status" -eq 0 ]
}

@test "Docker image smallest-docker-image:alpine-ldd could browse API" {
    run docker run -ti --rm smallest-docker-image:alpine-ldd
    [ "$status" -eq 0 ]
}

@test "Docker image smallest-docker-image:alpine-static could browse API" {
    run docker run -ti --rm smallest-docker-image:alpine-static
    [ "$status" -eq 0 ]
}

@test "Docker image smallest-docker-image:alpine-static-no-dns could browse API" {
    run docker run -ti --rm smallest-docker-image:alpine-static-no-dns
    [ "$status" -eq 0 ]
}

@test "Docker image smallest-docker-image:busybox-ldd could browse API" {
    run docker run -ti --rm smallest-docker-image:busybox-ldd
    [ "$status" -eq 0 ]
}

@test "Docker image smallest-docker-image:busybox-static could browse API" {
    run docker run -ti --rm smallest-docker-image:busybox-static
    [ "$status" -eq 0 ]
}

@test "Docker image smallest-docker-image:busybox-static-no-dns could browse API" {
    run docker run -ti --rm smallest-docker-image:busybox-static-no-dns
    [ "$status" -eq 0 ]
}

@test "Docker image smallest-docker-image:scratch-ldd could browse API" {
    run docker run -ti --rm smallest-docker-image:scratch-ldd
    [ "$status" -eq 0 ]
}

@test "Docker image smallest-docker-image:scratch-static could browse API" {
    run docker run -ti --rm smallest-docker-image:scratch-static
    [ "$status" -eq 0 ]
}

@test "Docker image smallest-docker-image:scratch-static-no-dns could browse API" {
    run docker run -ti --rm smallest-docker-image:scratch-static-no-dns
    [ "$status" -eq 0 ]
}
