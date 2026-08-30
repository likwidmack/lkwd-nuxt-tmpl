# Overlay: Content + Image + i18n

Off by default.

## Enable

1. Install:

```bash
npm install @nuxt/content @nuxt/image @nuxtjs/i18n
```

2. Merge [`overlays/content-image-i18n/nuxt.fragment.ts`](../../overlays/content-image-i18n/nuxt.fragment.ts) into `nuxt.config.ts`.
3. Add `content/` collections and `i18n` locale files as required by those modules.
4. Prefer Pug pages that call Content/i18n composables only after this overlay is on.

## Notes

- Useful for content sites; still optional for thin clones.
