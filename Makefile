BIN := node_modules/.bin
BABEL_NODE := $(BIN)/babel-node
ESLINT := $(BIN)/eslint
GULP := $(BIN)/gulp
KARMA := $(BIN)/karma
PROTRACTOR := $(BIN)/protractor
WEBDRIVER_MANAGER := $(BIN)/webdriver-manager
WEBPACK := $(BIN)/webpack
WEBPACK_DEV_SERVER := $(BIN)/webpack-dev-server

setup: clean
	@npm install

info:
	@$(BABEL_NODE) tools/custom/info.js

lint:
	@$(ESLINT) .

build: info clean
	@$(WEBPACK) --progress
	@$(GULP) build

run: info clean build
	@$(BABEL_NODE) tools/custom/run-serve.js

watch: info clean
	@$(BABEL_NODE) tools/custom/run-watch.js

test_unit:
	@$(KARMA) start

test_e2e:
	$(WEBDRIVER_MANAGER) update
	@$(PROTRACTOR)

test: info test_unit

test_full: info test_unit test_e2e

deploy: build
	@$(GULP) deploy

clean:
	@rm -rf dist/**
	@rm -f test-results.xml
