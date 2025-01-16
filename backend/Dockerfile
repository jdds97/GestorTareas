# syntax=docker/dockerfile:1
FROM python:3.12.3-bookworm AS base

# Crear usuario no-root
RUN adduser --uid=1000 taskuser

# Instalar dependencias del sistema
RUN <<EOF
set -eux
apt-get update --yes --quiet
apt-get install --yes --quiet --no-install-recommends \
    bash-completion \
    gettext \
    postgresql-client \
    python3-dev \
    libpq-dev
rm -rf /var/lib/apt/lists/*
EOF

# Configurar pipenv
WORKDIR /app
RUN pip install --upgrade pip wheel
RUN pip install pipenv

# Copiar Pipfile y Pipfile.lock
COPY Pipfile Pipfile.lock ./

# Instalar dependencias de Python.
RUN pipenv install --system --site-packages --deploy --dev

# Crear directorios necesarios y ajustar permisos
RUN <<EOF
set -eux
mkdir -p /app/media
mkdir -p /app/static
chown -R taskuser:taskuser /app
EOF

ENV PATH="$PATH:/home/taskuser/.local/bin"
ENV PYTHONUNBUFFERED=1

# Exponer puerto
EXPOSE 8000

# ### IMAGEN PARA HACER TESTS ###
FROM base AS test-runner

# Poblar el directorio home para desarrollo.
COPY --chown=taskuser:taskuser docker/dev-home/ /home/taskuser/

# Instalar paquetes de desarrollo.
WORKDIR /app
COPY --chown=taskuser:taskuser . .

USER taskuser

CMD ["/bin/bash"]

# # ### IMAGEN PARA HACER PRODUCCIÓN ###
FROM base AS runner
USER taskuser
COPY --chown=taskuser:taskuser . /app
WORKDIR /app

# Comando para producción
CMD [ "uwsgi", "--socket", "0.0.0.0:8000", \
               "--processes=4", \
               "--buffer-size=32768", \
               "--plugins", "python3", \
               "--wsgi-file", "config/wsgi.py" ]
