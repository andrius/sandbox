#!/bin/sh


docker images smallest-docker-image | grep -v 'TAG\|testimage'❯ | sort | \
	awk '{print "@test \"Docker image "$1":"$2" could browse API\" {\n    run docker run -ti --rm "$1":"$2"\n    [ \"$status\" -eq 0 ]\n}\n"}' >> \
	tests/docker.bats
