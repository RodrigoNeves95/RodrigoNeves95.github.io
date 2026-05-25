# Rodrigo Neves Website

Vue 3 + Vite migration of the personal website.

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

The site is static-first and deploys to Cloudflare from `dist`.

## Cloudflare Pages

If using Pages static deploys, use these settings:

- Root directory: `website-vue`
- Build command: `pnpm build`
- Build output directory: `dist`
- Environment variables:
  - `NODE_VERSION=22`
  - `PNPM_VERSION=9.15.1`

If deploying with Cloudflare Workers static assets, `wrangler.jsonc` enables SPA fallback for direct route loads.

For Workers builds, use:

- Build command: `pnpm build`
- Deploy command: `pnpm run deploy`

Wrangler requires Node 22+. Set `NODE_VERSION=22` in Cloudflare, and use Node 22 locally when running `pnpm run deploy`.
