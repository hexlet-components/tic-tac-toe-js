dev:
	npm run dev

build:
	npm run build

build-pages:
	npm run build:pages

test:
	npm run test

lint:
	npm run lint

test-watch:
	npx vitest

test-preview:
	npm run test-preview

release:
	npx release-it --only-version
