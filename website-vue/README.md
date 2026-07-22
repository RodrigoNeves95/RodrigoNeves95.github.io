# Rodrigo Neves Website

Vue 3 + Vite migration of the personal website.

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## Quality checks

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm exec playwright install chromium # first run only
pnpm test:e2e
pnpm check
pnpm audit --prod
```

`pnpm check` runs formatting, linting, type checking, unit tests, a production build, and browser smoke tests.

The site is static-first and deploys to Cloudflare from `dist`.

## Cloudflare deployment

GitHub Pages is disabled. Production is deployed from `main` through Cloudflare.

Use these build settings:

- Root directory: `website-vue`
- Build command: `pnpm build`
- Build output directory: `dist`
- Environment variables:
  - `NODE_VERSION=22`
  - `PNPM_VERSION=9.15.1`

`wrangler.jsonc` configures Cloudflare Workers static assets and real static route
responses.

For Workers builds, use:

- Build command: `pnpm build`
- Deploy command: `pnpm run deploy`

Wrangler requires Node 22+. Set `NODE_VERSION=22` in Cloudflare, and use Node 22 locally when running `pnpm run deploy`.
