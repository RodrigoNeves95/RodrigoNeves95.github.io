# Repository instructions for coding agents

These instructions apply to the entire repository. Keep changes scoped, reviewable,
and reproducible. When an instruction conflicts with an explicit user request, stop
and explain the conflict before changing repository or GitHub state.

## Repository map

- `website-vue/`: Vue 3, TypeScript, Vite, Vitest, and Playwright website.
- `resume/`: XeLaTeX résumé and cover-letter sources plus publication tooling.
- `.github/workflows/`: validation only. Production deployment is managed by
  Cloudflare outside GitHub Actions.

The production origin is `https://rnev.es/`. GitHub Pages is not a deployment
target. A merge into `main` is a production release because Cloudflare watches that
branch.

## Required Git workflow

1. Fetch and prune remotes and confirm the worktree is clean. Never discard,
   overwrite, or include unrelated user changes.
2. For normal work, update local `develop` from `origin/develop` using fast-forward
   only, then create one scoped `codex/<short-description>` branch.
3. Never commit or push directly to `develop` or `main`. Never force-push either
   protected branch.
4. Open implementation PRs against `develop`. Keep one logical change in each PR
   and squash-merge it after required checks pass.
5. Start each subsequent feature branch from the newly updated `develop`, not from
   an earlier feature branch.
6. Promote `develop` through a PR whose base is `main` and whose head is exactly
   `develop`. Use a regular merge commit for this PR; never squash or rebase it.
7. Do not merge a production PR unless the user explicitly asks for that release.
   After merging, verify the production deployment and key public routes.
8. For an urgent production hotfix, branch from `main`, PR back to `main`, then
   immediately reconcile `main` back into `develop` through a PR.
9. Delete merged feature branches. Never delete `main` or `develop`.

If branch ancestry is unclear, checks cannot run, protection would be bypassed, or
the requested base branch is inconsistent with this workflow, stop and report the
condition instead of guessing.

## Validation

Run checks from a clean checkout using the pinned package manager. Before opening
or updating a website PR:

```bash
cd website-vue
pnpm install --frozen-lockfile
pnpm check
pnpm audit --prod
```

Install Playwright's Chromium runtime first when it is absent:

```bash
cd website-vue
pnpm exec playwright install chromium
```

For changes under `resume/`, to its fonts, or to the published PDF, also run:

```bash
make -C resume verify
```

Use focused tests while iterating, but do not substitute them for the complete
applicable checks before publication. Do not weaken, skip, or delete a check merely
to make CI pass.

## Change discipline

- Read nearby code and tests before editing; preserve established structure and
  visual behavior unless the task explicitly changes them.
- Add or update tests for behavior changes and regression fixes.
- Keep dependencies minimal and update the lockfile with the declared pnpm version.
- Do not hand-edit generated build output. Generated static route files belong in
  `website-vue/dist/` and are not committed.
- Publish résumé changes through `make -C resume publish-resume`; the two committed
  résumé PDFs must remain byte-identical.
- Preserve the canonical `rnev.es` metadata, directly loadable `/` and `/snake`
  routes, a real no-index 404 response, and licensed self-hosted fonts.
- Never commit secrets, credentials, local environment files, logs, dependency
  directories, or editor artifacts.
- Do not add a GitHub Pages workflow or deployment. Do not add a `main` deployment
  job to GitHub Actions.

## Audit trail and handoff

Use a precise commit and PR title. The PR description must record:

- what changed and why;
- its dependency on prior work, if any;
- automated validation performed;
- relevant manual checks;
- rollback scope and deployment impact.

Before handing work back, inspect the final diff, report any unverified behavior or
remaining risk, and confirm the worktree contains no unintended files. Never claim
that a check, merge, push, deployment, or setting change succeeded without verifying
it.
