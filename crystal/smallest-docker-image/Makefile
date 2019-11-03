IMAGE_NAME := smallest-docker-image
ALL_IMAGES := \
	tests/testimage:testimage \
	official:0.31.1 \
	scratch/ldd:scratch-ldd \
	scratch/static:scratch-static \
	scratch/static-no-dns:scratch-static-no-dns \
	busybox/ldd:busybox-ldd \
	busybox/static:busybox-static \
	busybox/static-no-dns:busybox-static-no-dns \
	alpine/ldd:alpine-ldd \
	alpine/static:alpine-static \
	alpine/static-no-dns:alpine-static-no-dns \



# Default is first image from ALL_IMAGES list.
DOCKERFILE ?= $(word 1,$(subst :, ,$(word 1,$(ALL_IMAGES))))
TAG ?=  $(word 1,$(subst $(comma), ,\
                     $(word 2,$(subst :, ,$(word 1,$(ALL_IMAGES))))))

no-cache ?= no

comma := ,
empty :=
space := $(empty) $(empty)
eq = $(if $(or $(1),$(2)),$(and $(findstring $(1),$(2)),\
                                $(findstring $(2),$(1))),1)



# Default makefile action
all: | image-all test



# Build all supported Docker images.
#
# Usage:
#	make image-all

image-all:
	(set -e ; $(foreach img,$(ALL_IMAGES), \
		make image no-cache=$(no-cache) \
			DOCKERFILE=$(word 1,$(subst :, ,$(img))) \
			TAG=$(word 1,$(subst $(comma), ,\
					 $(word 2,$(subst :, ,$(img))))) ; \
	))



# Build Docker image.
#
# Usage:
#	make image [no-cache=(yes|no)] [DOCKERFILE=] [TAG=]

no-cache-arg = $(if $(call eq, $(no-cache), yes), --no-cache, $(empty))

image:
	docker build $(no-cache-arg) -t $(IMAGE_NAME):$(TAG) $(DOCKERFILE)



# Run tests for docker images.
#
# Usage:
#	make test

test: deps.bats
	./tests/bats/bats tests/docker.bats



# Resolve project dependencies for running Bats tests.
#
# Usage:
#	make deps.bats [BATS_VER=]

BATS_VER ?= 0.4.0

deps.bats:
ifeq ($(wildcard $(PWD)/tests/bats),)
	mkdir -p $(PWD)/tests/bats/vendor
	wget https://github.com/sstephenson/bats/archive/v$(BATS_VER).tar.gz \
		-O $(PWD)/tests/bats/vendor/bats.tar.gz
	tar -xzf $(PWD)/tests/bats/vendor/bats.tar.gz \
		-C $(PWD)/tests/bats/vendor
	rm -f $(PWD)/tests/bats/vendor/bats.tar.gz
	ln -s $(PWD)/tests/bats/vendor/bats-$(BATS_VER)/libexec/* \
		$(PWD)/tests/bats/
endif



.PHONY: all \
	build \
        stop \
	start \
        test deps.bats
