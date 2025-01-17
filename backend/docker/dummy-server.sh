#!/bin/bash

# Dummy server - keeps the container running for development without starting a
# server.

set -e

# Catch SIGTERM from `docker stop`.
trap "exit" EXIT

echo "Listo. Usa 'docker compose exec $HOSTNAME bash' para acceder al contenedor."

# Stay in foreground.
while true; do
    sleep 1
done
