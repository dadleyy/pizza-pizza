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
STYLE=$(APP_DIST)/main.css

HTML_FILES=$(shell git ls-files | grep ".html")
STYLE_FILES=$(shell git ls-files | grep ".css")
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
	$(RM) $(APP_DIST)

$(ARTIFACT): $(INDEX) $(SCRIPT) $(STYLE)
	@echo "[pizza-pizza] creating artifact"
	$(MKDIR) $(dir $(ARTIFACT))
	tar -cvzf $(ARTIFACT) -C $(DIST) $(NAME)

$(APP_DIST):
	$(MKDIR) $(APP_DIST)

$(INDEX): $(HTML_FILES) $(APP_DIST)
	@echo "[pizza-pizza] creating index.html [$(HTML_FILES)]"
	$(COPY) $(HTML_FILES) $(INDEX)

$(STYLE): $(STYLE_FILES) $(APP_DIST)
	@echo "[pizza-pizza] creating main.css [$(STYLE_FILES)]"
	$(COPY) $(filter %main.css, $(STYLE_FILES)) $(STYLE)
	$(COPY) $(STYLE_FILES) $(APP_DIST)

$(SCRIPT): $(ELM_FILES) $(APP_DIST)
	@echo "[pizza-pizza] compiling elm: $(ELM_FILES) [$(ELM_MAIN)]"
	$(ELM) make $(ELM_MAIN) --output $(SCRIPT)
