# lkwd-nuxt-tmpl

Likwid **Nuxt 4** GitHub template: Pug, SCSS, house tooling, HyperActivity-style `SYS_ENV`, Vitest, Playwright, and dual agent surfaces (Cursor + Codex).

## Use this template

1. On GitHub: **Use this template** → create a new repository (or clone this repo).
2. Enable **Template repository** in GitHub → Settings → General (one-time for this source repo).
3. Locally:

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Open the URL Nuxt prints (default `http://127.0.0.1:3000`).

## Scripts

| Script                      | Purpose                                         |
| --------------------------- | ----------------------------------------------- |
| `npm run dev`               | Dev server (`.env.local`)                       |
| `npm run lint` / `lint:fix` | ESLint + Prettier                               |
| `npm run typecheck`         | `nuxt typecheck`                                |
| `npm test`                  | Vitest unit tests                               |
| `npm run test:e2e`          | Playwright smoke (builds + previews `.env.e2e`) |
| `npm run regression:ci`     | Lint + typecheck + unit + `build:test`          |

## Env matrix

| Variable                          | Values                                  |
| --------------------------------- | --------------------------------------- |
| `SYS_ENV`                         | `local` \| `image` \| `server`          |
| `NUXT_PUBLIC_APP_ENV` / lifecycle | `development` \| `test` \| `production` |

Helpers: `shared/utils/runtimeEnvironment.ts`.

## Agent guidance

- Canonical shared policy: [`.agent/AGENTS.md`](./.agent/AGENTS.md) (index: [`.agent/README.md`](./.agent/README.md))
- Universal stub (widely auto-loaded): [`AGENTS.md`](./AGENTS.md)
- Cursor: [`.cursor/rules/`](./.cursor/rules/)
- Codex: [`.codex/`](./.codex/)
- Claude-compatible stub: [`CLAUDE.md`](./CLAUDE.md)

## Optional overlays

Off by default. Enable only when a project needs them:

- [PrimeVue](docs/overlays/primevue.md)
- [Content + Image + i18n](docs/overlays/content-image-i18n.md)
- [PWA](docs/overlays/pwa.md)
- [AWS deploy (primary recipe)](docs/overlays/aws.md)
- [Docker stubs](docs/overlays/docker.md)

See also [`overlays/README.md`](overlays/README.md).

## GitHub template checklist

- [ ] Push this repo to GitHub
- [ ] Settings → General → check **Template repository**
- [ ] Protect `main` as desired; CI runs on PRs to `main` / `development`
- [ ] Replace this README’s product name when cloning for a real app

## Requirements

Node `>=26.5.0` (see `.nvmrc`). npm is the package manager.
