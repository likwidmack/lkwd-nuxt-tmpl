# Overlay: AWS (primary optional deploy recipe)

Off by default. Core stays provider-agnostic; AWS is the first-class optional path.

## Enable

1. Review stubs under [`overlays/aws/`](../../overlays/aws/).
2. Install AWS tooling locally as needed (`aws`, `sam`).
3. Wire Nitro preset via `SYS_ENV=server` → `aws-lambda` (see `shared/utils/runtimeEnvironment.ts`).
4. Copy/adapt SAM templates from `overlays/aws/sam/` into `infra/sam/` when ready to deploy.
5. Add CD workflows from `overlays/aws/workflows/` into `.github/workflows/` only when secrets/environments exist.

## Other hosts

Use Nitro presets for Cloudflare/Vercel as needed; this template does not ship equal first-class tracks for them.
