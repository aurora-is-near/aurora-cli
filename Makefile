TSC = npx tsc
TYPEDOC = npx typedoc

# The default target:

all: aurora.js

.PHONY: all

# Rules for development:

%.js: %.ts tsconfig.json package.json package-lock.json
	$(TSC)

%.d.ts: %.js

docs:
	$(TYPEDOC) --out $@

clean:
	@rm -Rf docs *.js *.d.ts *~

distclean: clean

mostlyclean: clean

maintainer-clean: clean

.PHONY: clean distclean mostlyclean maintainer-clean

.SECONDARY:
.SUFFIXES:
