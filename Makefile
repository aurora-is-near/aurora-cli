TSC = npx tsc
TYPEDOC = npx typedoc

# The default target:

all: lib/aurora.js

.PHONY: all

# Rules for development:

lib/%.js: src/%.ts tsconfig.json package.json package-lock.json
	$(TSC)

lib/%.d.ts: lib/%.js

docs:
	$(TYPEDOC) --out $@

clean:
	@rm -Rf docs lib/*.js lib/*.d.ts *~

distclean: clean

mostlyclean: clean

maintainer-clean: clean

.PHONY: clean distclean mostlyclean maintainer-clean

.SECONDARY:
.SUFFIXES:
