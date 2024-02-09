#!/bin/bash

set -x

echo "Building project with Debian Jessie..."

cd /github/workspace

# List project files
ls -lai

# Print OS version
cat /etc/iss*

# Your build commands here
# For example, install dependencies and build the Debian package

if [ -f "debian/control" ]; then
	echo "debian/control file found."
	# Add your specific build commands for Debian packages
else
	echo "Error: debian/control file does not exist."
	exit 1
fi

echo "Build complete."
