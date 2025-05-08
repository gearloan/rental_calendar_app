#!/bin/sh
set -e


# Start Rails server
bin/rails server -b 0.0.0.0 -p ${PORT:-8080}
