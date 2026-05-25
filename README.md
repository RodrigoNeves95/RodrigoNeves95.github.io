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

The site is prepared for Cloudflare Pages:

- Root directory: `website-vue`
- Build command: `pnpm build`
- Build output directory: `dist`
- Node version: `22`
- pnpm version: `9.15.1`

## Resume

The CV source lives in `resume/resume/`. The generated PDF is copied into `website-vue/public/resume.pdf` so the website can serve it.
