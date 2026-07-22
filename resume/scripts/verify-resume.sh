#!/usr/bin/env bash
set -euo pipefail

source_pdf=$1
website_pdf=$2
built_pdf=$3
temporary_directory=$(mktemp -d)
trap 'rm -rf "$temporary_directory"' EXIT

cmp "$source_pdf" "$website_pdf"

normalize_pdf_text() {
  pdftotext "$1" - | sed -E \
    '/^(JANUARY|FEBRUARY|MARCH|APRIL|MAY|JUNE|JULY|AUGUST|SEPTEMBER|OCTOBER|NOVEMBER|DECEMBER) [0-9]{1,2}, [0-9]{4}$/d'
}

normalize_pdf_text "$source_pdf" > "$temporary_directory/source.txt"
normalize_pdf_text "$built_pdf" > "$temporary_directory/built.txt"
diff -u "$temporary_directory/source.txt" "$temporary_directory/built.txt"

pdfinfo "$built_pdf" | grep -Eq '^Pages:[[:space:]]+1$'
pdfinfo "$built_pdf" | grep -Eq '^Page size:.*\(A4\)$'
grep -Fq 'rnev.es' "$temporary_directory/built.txt"
