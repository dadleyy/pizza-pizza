NAME=pizza-pizza
ELM=$(shell which elm)
RM=rm -rf
MKDIR=mkdir -p
COPY=cp

DIST=./dist
ARTIFACT=$(DIST)/artifacts/pizza-pizza.tar.gz

# Name of the directory under which to place the app
APP_DIST=$(DIST)/$(NAME)
SCRIPT=$(APP_DIST)/main.js
INDEX=$(APP_DIST)/index.html

HTML_FILES=$(shell git ls-files | grep ".html")
STYLE_FILES=$(shell git ls-files | grep ".sass")
ELM_FILES=$(shell git ls-files | grep ".elm")
ELM_MAIN=$(filter %Main.elm,$(ELM_FILES))

.PHONY: all clean

all: $(INDEX) $(SCRIPT) $(STYLE)

release: $(ARTIFACT)

clean:
	$(RM) $(INDEX)
	$(RM) $(STYLE)
	$(RM) $(SCRIPT)
	$(RM) $(ARTIFACT)

$(ARTIFACT): $(INDEX) $(SCRIPT) $(STYLE)
	@echo "[pizza-pizza] creating artifact"
	$(MKDIR) $(dir $(ARTIFACT))
	tar -cvzf $(ARTIFACT) -C $(DIST) $(NAME)

$(INDEX): $(HTML_FILES)
	@echo "[pizza-pizza] creating index.html [$(HTML_FILES)]"
	$(COPY) $(HTML_FILES) $(INDEX)

$(STYLE): $(STYLE_FILES)

$(SCRIPT): $(ELM_FILES)
	@echo "[pizza-pizza] compiling elm: $(ELM_FILES) [$(ELM_MAIN)]"
	$(ELM) make $(ELM_MAIN) --output $(SCRIPT)
