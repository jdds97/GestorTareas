MANAGE = python3 -m django

.PHONY: migrate
migrate: wait-for-db
	$(MANAGE) createcachetable
	$(MANAGE) migrate

.PHONY: migrations
migrations:
	$(MANAGE) makemigrations

.PHONY: static
static:
	$(MANAGE) collectstatic --noinput

.PHONY: superuser
superuser:
	$(MANAGE) createsuperuser

.PHONY: flush
flush:
	$(MANAGE) flush

.PHONY: shell
shell:
	$(MANAGE) shell

.PHONY: runserver
runserver:
	$(MANAGE) runserver 0.0.0.0:8000

.PHONY: uwsgi
uwsgi: static wait-for-db
	@uwsgi --socket 0.0.0.0:8000 \
		--processes=4 \
		--buffer-size=32768 \
		--wsgi-file config/wsgi.py

.PHONY: wait-for-db
wait-for-db:
	@while ! pg_isready -h "db" -p "5432" -U "postgres"; do \
		echo "Esperando a la base de datos..."; \
		sleep 1; \
	done

clean_migrations:
	find apps/*/migrations -name "*.py" ! -name "__init__.py" -delete
	find apps/*/migrations -name "*.pyc" -delete
	find apps/*/migrations -name "__pycache__" -type d -exec rm -r {} +

# Comando para reiniciar migraciones
reset_migrations: clean_migrations migrations migrate 