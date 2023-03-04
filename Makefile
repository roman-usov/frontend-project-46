install:
	npm ci

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

pretty:
	npx prettier --write .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8
