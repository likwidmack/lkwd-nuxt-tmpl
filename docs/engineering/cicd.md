# CI/CD

Workflow topology for this template. Optional AWS CD stays in [`docs/overlays/aws.md`](../overlays/aws.md).

## Flow

```
PR → development     → CI (Branch policy, Regression / test, Playwright e2e); merge with rebase
PR → main            → same CI; head must be development; merge with squash (auto-merge OK)
push → main|development → Branch policy workflow (reject unprotected direct pushes)
```

Default branch is `development`. Protect `main` with GitHub branch protection / rulesets when available (private Free does not; public or Pro does).

## Merge policy

| Branch        | How to land changes                  | Merge method                                |
| ------------- | ------------------------------------ | ------------------------------------------- |
| `development` | Pull request                         | **Rebase only**                             |
| `main`        | Pull request from `development` only | **Squash only** (auto-merge squash allowed) |

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
npm run gh:setup-rulesets                # dry-run + checklist (rebase on development, squash on main)
APPLY_RULESETS=1 npm run gh:setup-rulesets
```

Private GitHub Free may not enable rulesets or classic branch protection. Until the plan does, enforce promotion with `branch-policy.yml` and the CI Branch policy job, and follow the merge methods above manually.

## Agent rules

- Keep CI and optional CD separate.
- Set `HUSKY=0` and `NUXT_TELEMETRY_DISABLED=1` on Actions jobs.
- Do not set job-level `NODE_ENV=production` before `npm ci`.
