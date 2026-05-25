# Rodrigo Neves Website

Vue 3 + Vite migration of the personal website.

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

The site is static-first and deploys to Cloudflare Pages from `dist`.

## Cloudflare Pages

Use these settings when creating the Pages project:

- Root directory: `website-vue`
- Build command: `pnpm build`
- Build output directory: `dist`
- Environment variables:
  - `NODE_VERSION=22`
  - `PNPM_VERSION=9.15.1`

The `public/_redirects` file keeps Vue Router routes working on direct page loads.
