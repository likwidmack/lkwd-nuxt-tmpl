# lkwd-nuxt-tmpl

[![CI](https://github.com/likwidmack/lkwd-nuxt-tmpl/actions/workflows/ci.yml/badge.svg?branch=development)](https://github.com/likwidmack/lkwd-nuxt-tmpl/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D26.5.0-brightgreen)](./.nvmrc)
[![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82)](https://nuxt.com)
[![Use this template](https://img.shields.io/badge/GitHub-Use_this_template-181717?logo=github)](https://github.com/likwidmack/lkwd-nuxt-tmpl/generate)

Public **Nuxt 4** GitHub template for Likwid apps: Pug, SCSS, house tooling, `SYS_ENV` matrix, Vitest, Playwright, dual agent surfaces, and optional AWS/PWA overlays.

## Quick start

```bash
# From GitHub: Use this template → clone your new repo, then:
cp .env.local.example .env.local
npm install
npm run dev
```

Open the URL Nuxt prints (default `http://127.0.0.1:3000`).

## Features

- Nuxt 4 + Vue 3 + TypeScript strict + SSR
- Pug templates + SCSS + ESLint/Prettier (Pug-aware)
- House `SYS_ENV`: `local` | `image` | `server`
- Vitest unit tests + Playwright e2e in CI
- Shared `.agent/` policy with Cursor / Codex / Claude stubs
- Optional overlays: PrimeVue, Content/Image/i18n, PWA, AWS, Docker

## Documentation

The root README is the GitHub landing page only. Topic docs live under [`docs/`](docs/README.md):

| Topic                   | Path                                                                             |
| ----------------------- | -------------------------------------------------------------------------------- |
| Docs catalog            | [`docs/README.md`](docs/README.md)                                               |
| CI/CD and branch policy | [`docs/engineering/cicd.md`](docs/engineering/cicd.md)                           |
| Git collaboration       | [`docs/engineering/git-collaboration.md`](docs/engineering/git-collaboration.md) |
| Optional overlays       | [`docs/overlays/`](docs/overlays/)                                               |
| Requirements plan       | [`docs/plans/`](docs/plans/)                                                     |

## Agent guidance

- Canonical policy: [`.agent/AGENTS.md`](.agent/AGENTS.md)
- Stub: [`AGENTS.md`](AGENTS.md) · Cursor: [`.cursor/rules/`](.cursor/rules/) · Codex: [`.codex/`](.codex/)

## Package metadata

This app stays `"private": true` (not published to the npm registry). `package.json` still carries npm-standard `description`, `keywords`, `repository`, `bugs`, `homepage`, `author`, and `license` for tooling and discoverability.

## Requirements

Node `>=26.5.0` (see `.nvmrc`). npm is the package manager.

## License

[MIT](./LICENSE)

## Security

Public template: no secrets in git. See [`SECURITY.md`](SECURITY.md). Copy `.env*.example` files only; never commit real `.env` or TLS materials.
