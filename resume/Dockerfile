FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -q && apt-get install -qy \
    make \
    poppler-utils \
    texlive-fonts-extra \
    texlive-latex-extra \
    texlive-xetex \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /data
VOLUME ["/data"]
