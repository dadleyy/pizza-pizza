NAME=pizza-pizza
ELM=$(shell which elm)
UGLIFY=$(shell which uglifyjs)
XSLT=$(shell which xsltproc)
RM=rm -rf
MKDIR=mkdir -p
COPY=cp

DIST=./dist
ARTIFACT=$(DIST)/artifacts/pizza-pizza.tar.gz

INDEX_PARAMS=--stringparam style-src main.css --stringparam script-src main.js
RELEASE_INDEX_PARAMS=--stringparam style-src main.css --stringparam script-src main.min.js

XML_FILES=$(shell git ls-files | grep ".xml")
STYLE_FILES=$(shell git ls-files | grep ".css")
ELM_FILES=$(shell git ls-files | grep ".elm")
ELM_MAIN=$(filter %Main.elm,$(ELM_FILES))
INDEX_XML=$(filter %index.xml,$(XML_FILES))
INDEX_XSLT=$(shell git ls-files | grep "index.xslt")

# Name of the directory under which to place the app
APP_DIST=$(DIST)/debug/$(NAME)
RELEASE_DIST=$(DIST)/release/$(NAME)
SCRIPT=$(APP_DIST)/main.js
INDEX=$(patsubst src/%.xml,$(APP_DIST)/%.html,$(INDEX_XML))
STYLES=$(patsubst src/%.css,$(APP_DIST)/%.css,$(STYLE_FILES))

RELEASE_SCRIPT=$(patsubst %.js,%.min.js,$(patsubst $(APP_DIST)%,$(RELEASE_DIST)%,$(SCRIPT)))
RELEASE_INDEX=$(patsubst $(APP_DIST)%,$(RELEASE_DIST)%,$(INDEX))
RELEASE_STYLES=$(patsubst $(APP_DIST)/%.css,$(RELEASE_DIST)/%.css,$(STYLES))

.PHONY: all clean debug

all: $(INDEX) $(SCRIPT) $(STYLES)

debug:
	@echo "+ [pizz-pizza:debug]"
	@echo "styles:\n - input: $(STYLE_FILES)\n - output: $(STYLES)\n - release: $(RELEASE_STYLES)"
	@echo "index:\n - input: $(INDEX_XML)\n - output: $(INDEX)\n - release: $(RELEASE_INDEX)"
	@echo "script:\n - input: $(ELM_MAIN)\n - output: $(SCRIPT)\n - release: $(RELEASE_SCRIPT)"

release: $(RELEASE_SCRIPT) $(RELEASE_INDEX) $(RELEASE_STYLES)

artifact: $(ARTIFACT)

clean:
	$(RM) $(INDEX)
	$(RM) $(STYLES)
	$(RM) $(SCRIPT)
	$(RM) $(ARTIFACT)
	$(RM) $(APP_DIST)
	$(RM) $(RELEASE_DIST)

clean-all:
	$(RM) $(DIST)

$(ARTIFACT): $(RELEASE_INDEX) $(RELEASE_SCRIPT) $(RELEASE_STYLES)
	@echo "+ [pizza-pizza:artifact] creating artifact"
	$(MKDIR) $(dir $(ARTIFACT))
	$(MKDIR) $(RELEASE_DIST)
	tar -cvzf $(ARTIFACT) -C $(DIST)/release $(NAME)

$(RELEASE_SCRIPT): $(SCRIPT)
	@echo "+ [pizza-pizza:release-script] minifying $(SCRIPT): $(RELEASE_SCRIPT)"
	$(MKDIR) $(RELEASE_DIST)
	$(UGLIFY) --output $(RELEASE_SCRIPT) $(SCRIPT)

$(RELEASE_INDEX): $(INDEX)
	@echo "+ [pizza-pizza:release-index] minifying $(INDEX): $(RELEASE_INDEX)"
	$(XSLT) $(RELEASE_INDEX_PARAMS) --output $(RELEASE_INDEX) $(INDEX_XSLT) $(INDEX_XML)

$(RELEASE_STYLES): $(STYLES)
	@echo "+ [pizza-pizza:release-style] minifying $(STYLES): $(RELEASE_STYLES)"
	$(COPY) $(STYLES) $(RELEASE_DIST)

$(APP_DIST):
	$(MKDIR) $(APP_DIST)

$(INDEX): $(INDEX_XML) $(APP_DIST) $(INDEX_XSLT)
	@echo "+ [pizza-pizza:index] creating index.html [$(INDEX_XML)]"
	$(XSLT) $(INDEX_PARAMS) --output $(INDEX) $(INDEX_XSLT) $(INDEX_XML)

$(STYLES): $(STYLE_FILES)
	@echo "+ [pizza-pizza:styles] $(STYLE_FILES) -> $(STYLES)"
	$(COPY) $(STYLE_FILES) $(APP_DIST)

$(SCRIPT): $(ELM_FILES) $(APP_DIST)
	@echo "+ [pizza-pizza:script] compiling elm: $(ELM_FILES) [$(ELM_MAIN)]"
	$(ELM) make $(ELM_MAIN) --output $(SCRIPT)
