#!/usr/bin/env bash

set -e

if [ -d build ]; then
	rm -r build
fi

mkdir build
cd build

cmake ..
make
