# Shared agent policy (canonical)

Full house guidance for any AI harness. Harness-specific directories (`.cursor/`, `.codex/`, `CLAUDE.md`) stay thin and point here.

Root [`AGENTS.md`](../AGENTS.md) is a short universal stub so tools that only auto-load that file still find this policy.

## Product

`lkwd-nuxt-tmpl` is a thin Nuxt 4 GitHub template: Pug, SCSS, house tooling, HyperActivity-style `SYS_ENV`, Vitest, Playwright, and optional overlays (PrimeVue, Content/Image/i18n, PWA, AWS).

Do not import product/strategy content from HyperActivity or portfolio apps into clones.

## Stack conventions

- Nuxt 4 + Vue 3 + TypeScript strict + SSR
- Templates: Pug (`<template lang="pug">`)
- Styles: SCSS (`lang="scss"` / `app/assets/styles/`)
- Package manager: npm; Node `>=26.5.0` (see `.nvmrc`)
- Lint/format: ESLint (`@nuxt/eslint`) + Prettier (incl. `@prettier/plugin-pug`)
- Tests: Vitest under `tests/unit/`; Playwright under `tests/e2e/`

## Env matrix

Use HyperActivity-style naming:

- `SYS_ENV`: `local` | `image` | `server`
- Node lifecycle / `NUXT_PUBLIC_APP_ENV`: `development` | `test` | `production`
- Helpers live in `shared/utils/runtimeEnvironment.ts`
- Prefer `--dotenv .env.<profile>` scripts over ad-hoc env soup

## Layout

- App code: `app/`
- Shared pure helpers: `shared/`
- Shared agent policy: `.agent/` (this tree)
- Optional enablement: `docs/overlays/` and `overlays/`
- Requirements plan: `docs/plans/`

## Agent surfaces

| Path               | Role                                           |
| ------------------ | ---------------------------------------------- |
| `.agent/`          | Shared canonical policy (any harness)          |
| `AGENTS.md` (root) | Universal stub — auto-discovered by many tools |
| `.cursor/rules/`   | Cursor-specific thin rules                     |
| `.codex/`          | Codex-specific thin rules                      |
| `CLAUDE.md`        | Claude-compatible stub                         |

When changing conventions, edit `.agent/AGENTS.md` first, then keep the stub and harness dirs aligned.

## Optional overlays

PrimeVue, Content/Image/i18n, PWA, and AWS/Docker stay **off by default**. Enable only via `docs/overlays/*.md`. Do not enable overlays casually in PRs without an explicit request.

## Working rules

- Prefer small, focused diffs
- Exhaustive `switch` on unions with a `never` default
- No inline imports — keep imports at top of modules
- Do not commit secrets or non-example `.env` files
