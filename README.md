# lkwd-nuxt-tmpl

Likwid **Nuxt 4** GitHub template: Pug, SCSS, house tooling, HyperActivity-style `SYS_ENV`, Vitest, Playwright, and dual agent surfaces.

## Quick start

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Open the URL Nuxt prints (default `http://127.0.0.1:3000`).

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

## Requirements

Node `>=26.5.0` (see `.nvmrc`). npm is the package manager.
