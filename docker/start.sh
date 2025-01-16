#!/bin/sh

set -e

# Necesario para que git no se queje de los cambios en los permisos
chmod 0600 "./backend/docker/dev-home/.pgpass"

docker compose build --pull
docker compose up --remove-orphans
