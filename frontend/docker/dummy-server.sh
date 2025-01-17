#!/bin/bash

# Servidor simulado - mantiene el contenedor en ejecución para desarrollo sin iniciar un
# servidor real.

set -e

mkdir /container
mount -o bind / /container

# Monta el directorio node_modules en el contenedor sobre los montados
# desde el host.
for NAME in node_modules; do
  DIR="/app/${NAME}"
  mkdir -p "${DIR}"
  mount -o rbind "/container/${DIR}" "${DIR}"
done

umount /container
rmdir /container

# Captura SIGTERM desde `docker stop`.
trap "exit" EXIT

echo "Listo. Usa 'docker compose exec -u node frontend bash' para acceder al contenedor."

# Mantener en primer plano.
while true; do
    sleep 1
done
