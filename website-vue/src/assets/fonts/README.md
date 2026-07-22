# Webfont provenance

The site self-hosts the Latin WOFF2 builds supplied by Fontsource. Only the files referenced by
`src/styles/main.css` are emitted into the production build.

- **Figtree 5.3.0** — regular 400, medium 500, semibold 600, and italic 400. Upstream:
  <https://github.com/erikdkennedy/figtree>. Copyright 2022 The Figtree Project Authors.
- **IBM Plex Mono 5.3.0** — regular 400 and semibold 600. Upstream:
  <https://github.com/IBM/plex>. Copyright 2017 IBM Corp.

Both families are redistributed under the SIL Open Font License 1.1 in `OFL-1.1.txt`. Exact
package versions and integrity hashes are recorded in `pnpm-lock.yaml`.
