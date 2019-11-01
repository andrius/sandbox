#!/bin/sh

USER=$(whoami)
GROUP=sudo

if id -nG "$USER" | grep -qw "$GROUP"; then
    echo $USER belongs to $GROUP
else
    echo $USER does not belong to $GROUP
fi

is_sudo() {
    local user=$(whoami)
    local group="sudo"
    if id -nG "${user}" | grep -qw "${group}"; then
      return 0
    else
      return 1
    fi
}

is_sudo && echo "in group" || echo "not"

