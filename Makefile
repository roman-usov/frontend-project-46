install:
	npm ci

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

pretty:
	prettier --write .

test:
	npm test --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8
