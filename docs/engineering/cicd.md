# CI/CD

Workflow topology for this template. Optional AWS CD stays in [`docs/overlays/aws.md`](../overlays/aws.md).

## Flow

```
PR → development     → CI (Branch policy, Regression / test, Playwright e2e)
PR → main            → same CI; head branch must be development
push → main|development → Branch policy workflow (reject direct pushes)
```

## Merge policy

| Branch        | How to land changes                          | Notes                        |
| ------------- | -------------------------------------------- | ---------------------------- |
| `development` | Squash-merged PR                             | Feature work integrates here |
| `main`        | Squash-merged PR whose head is `development` | Promotion only               |

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
npm run gh:setup-merge-settings          # squash-only, PR_TITLE + BLANK
npm run gh:setup-rulesets                # dry-run + checklist
APPLY_RULESETS=1 npm run gh:setup-rulesets
```

Private GitHub Free may not enable rulesets or classic branch protection. Until the plan does, enforce promotion with `branch-policy.yml` and the CI Branch policy job, and keep merge method at squash only.

## Agent rules

- Keep CI and optional CD separate.
- Set `HUSKY=0` and `NUXT_TELEMETRY_DISABLED=1` on Actions jobs.
- Do not set job-level `NODE_ENV=production` before `npm ci`.
