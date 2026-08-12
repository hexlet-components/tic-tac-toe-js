dev:
	pnpm run dev

build:
	pnpm run build

build-pages:
	pnpm run build:pages

test:
	pnpm run test

lint:
	pnpm run lint
	pnpm --silent run format:check

test-watch:
	pnpm exec vitest

test-preview:
	pnpm run test-preview

install:
	pnpm install
