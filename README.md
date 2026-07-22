# Rodrigo Neves

Repository containing my professional website and resume.

## Website

The website lives in `website-vue/` and is built with Vue 3 + Vite.

```bash
cd website-vue
pnpm install
pnpm dev
pnpm build
```

## Deployment

Production is deployed through Cloudflare from `main`. GitHub Pages is disabled.

Cloudflare uses:

- Root directory: `website-vue`
- Build command: `pnpm build`
- Build output directory: `dist`
- Node version: `22`
- pnpm version: `9.15.1`

Implementation PRs target `develop`. A release PR promotes `develop` to `main`
using a regular merge commit; that merge starts the production deployment.

## Resume

The CV source lives in `resume/resume/`. Build and publish it to the website with:

```bash
make -C resume publish-resume
make -C resume verify
```
