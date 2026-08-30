# Overlay: PWA

Off by default.

## Enable

1. Install:

```bash
npm install -D @vite-pwa/nuxt @vite-pwa/assets-generator
```

2. Merge [`overlays/pwa/nuxt.fragment.ts`](../../overlays/pwa/nuxt.fragment.ts) into `nuxt.config.ts`.
3. Add icons/manifest assets under `public/` and tune Workbox as needed.
4. For SSR + CDN/CloudFront, keep the service worker and manifest on the HTML origin (see HyperActivity PWA notes when adapting).

## Notes

- Template identity stays non-PWA until this overlay is enabled.
