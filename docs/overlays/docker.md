# Overlay: Docker

Off by default. Not required for `npm run dev`.

## Enable

1. Copy stubs from [`overlays/docker/`](../../overlays/docker/) into `docker/` at the repo root.
2. Add compose env files (do not commit secrets).
3. Prefer `SYS_ENV=image` for container runs (`deploymentTarget: docker`, Nitro `node-server`).

## Notes

- Pair with the AWS overlay when promoting image → server; keep local Nuxt free of Docker requirements.
