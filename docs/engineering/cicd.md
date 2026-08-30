# CI/CD

Workflow topology for this template. Optional AWS CD stays in [`docs/overlays/aws.md`](../overlays/aws.md).

## Flow

```
PR → development     → CI; merge with squash or rebase (auto-squash OK)
PR → main            → CI; head must be development; squash + auto-merge
push → main|development → Branch policy workflow (PR-only; reject unprotected direct pushes)
```

Default branch is `development`. Protect both branches with rulesets when available (private Free does not; public or Pro does).

## Merge policy

| Branch        | Access                           | Merge methods                        |
| ------------- | -------------------------------- | ------------------------------------ |
| `development` | **PR only**                      | **Squash + rebase** (auto-squash OK) |
| `main`        | **PR only** (from `development`) | **Squash + auto-merge**              |

Merge commits are disabled repo-wide. Squash commit title/message: `PR_TITLE` / `BLANK`.

## Workflows

| Workflow                              | Purpose                                                                                                                                                                       |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.github/workflows/ci.yml`            | PR CI: branch gate + `regression:ci` + Playwright                                                                                                                             |
| `.github/workflows/branch-policy.yml` | Reject unprotected direct pushes; `main` only from merged `development` PRs. Commits already on an open PR into `main`/`development` are allowed so promotion PRs stay green. |

Required check **names** (rulesets / UI) must match job `name:` fields:

- `Branch policy`
- `Regression / test`
- `Playwright e2e` (required on `main` promotions)

## Repo setup scripts

```bash
npm run gh:setup-merge-settings          # squash + rebase buttons, auto-merge, no merge commits
npm run gh:setup-rulesets                # dry-run + checklist
APPLY_RULESETS=1 npm run gh:setup-rulesets
```

Private GitHub Free may not enable rulesets, classic branch protection, or auto-merge. Until the plan does, enforce PR-only with `branch-policy.yml` / CI Branch policy, and follow the merge methods above manually.

## Agent rules

- Keep CI and optional CD separate.
- Set `HUSKY=0` and `NUXT_TELEMETRY_DISABLED=1` on Actions jobs.
- Do not set job-level `NODE_ENV=production` before `npm ci`.
