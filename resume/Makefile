IMAGE ?= rnev-resume-latex
ROOT := $(CURDIR)
BUILD_DIR := $(ROOT)/build
SOURCE_DIR := $(ROOT)/resume
WEBSITE_RESUME := $(ROOT)/../website-vue/public/resume.pdf
DOCKER_RUN := docker run --rm -e TEXINPUTS=/data/resume//: -v "$(ROOT):/data" -v "$(ROOT)/../website-vue:/website-vue" -w /data $(IMAGE)

.PHONY: build-image resume cover-letter publish-resume verify clean

build-image:
	docker build -t $(IMAGE) .

resume: build-image
	mkdir -p "$(BUILD_DIR)"
	$(DOCKER_RUN) xelatex -interaction=nonstopmode -halt-on-error -output-directory=/data/build resume/resume.tex
	$(DOCKER_RUN) xelatex -interaction=nonstopmode -halt-on-error -output-directory=/data/build resume/resume.tex

cover-letter: build-image
	mkdir -p "$(BUILD_DIR)"
	$(DOCKER_RUN) xelatex -interaction=nonstopmode -halt-on-error -output-directory=/data/build resume/coverletter.tex
	$(DOCKER_RUN) xelatex -interaction=nonstopmode -halt-on-error -output-directory=/data/build resume/coverletter.tex

publish-resume: resume
	cp "$(BUILD_DIR)/resume.pdf" "$(SOURCE_DIR)/resume.pdf"
	cp "$(BUILD_DIR)/resume.pdf" "$(WEBSITE_RESUME)"

verify: resume
	$(DOCKER_RUN) scripts/verify-resume.sh /data/resume/resume.pdf /website-vue/public/resume.pdf /data/build/resume.pdf

clean:
	rm -rf "$(BUILD_DIR)"
