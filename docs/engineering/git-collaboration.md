# Git collaboration

Commit and PR conventions for this template. Workflow topology: [cicd.md](cicd.md).

## README standards

- Root `README.md` is the **GitHub landing page only**: purpose, quick start, links into `docs/`.
- Do not grow the root README into a second docs tree.
- Index topics in [`docs/README.md`](../README.md).
- Package or overlay READMEs stay local to that folder (`overlays/README.md`, etc.).
- Shared AI policy lives in `.agent/`; keep harness stubs thin.

## Branches

| Branch        | Role                                                           |
| ------------- | -------------------------------------------------------------- |
| `development` | Integration branch for feature PRs                             |
| `main`        | Stable / template default; accepts PRs from `development` only |

## Commits

Use Conventional Commits. Commit only when asked. Do not put `[skip ci]` tokens in subjects or bodies. If GPG signing fails, fix signing — do not create unsigned commits.

## Pull requests

| Base          | Head               | Merge  | Checks                                                 |
| ------------- | ------------------ | ------ | ------------------------------------------------------ |
| `development` | feature branch     | Squash | `Branch policy`, `Regression / test`, `Playwright e2e` |
| `main`        | `development` only | Squash | Same                                                   |

## Squash merge settings

| Field                       | Value      |
| --------------------------- | ---------- |
| Allow squash merging        | yes (only) |
| Squash merge commit title   | `PR_TITLE` |
| Squash merge commit message | `BLANK`    |

Apply with `npm run gh:setup-merge-settings`.
