CLEANDIRS = .next


.PHONY: all
all: build

.PHONY: build
build:
	@echo "Creando la compilación de producción..."
	npm run build

.PHONY: dev
dev:
	npm run dev

.PHONY: test
test:
	@echo "Ejecutando pruebas unitarias..."
	@npm run test

.PHONY: lint
lint: eslint types stylelint

.PHONY: types
types:
	@echo "Verificando tipos..."
	@tsc --noEmit
	@echo "\e[32mOK\e[0m"

.PHONY: eslint
eslint:
	@echo "Verificando código JavaScript..."
	@npx next lint $(ESLINT_OPTS) --dir app/ --file ./auth.ts --file ./middleware.ts --file ./next-env.d.ts

.PHONY: eslint-fix
eslint-fix: ESLINT_OPTS = --fix
eslint-fix: eslint

.PHONY: stylelint
stylelint:
	@echo "Verificando código SCSS..."
	@npx stylelint $(STYLELINT_OPTS) "src/**/*.{css,scss}"
	@echo "\e[32mOK\e[0m"

.PHONY: stylelint-fix
stylelint-fix: STYLELINT_OPTS = --fix
stylelint-fix: stylelint

.PHONY: clean
clean:
	-rm -rf $(CLEANDIRS)
