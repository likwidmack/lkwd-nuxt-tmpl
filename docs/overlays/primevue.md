# Overlay: PrimeVue

Off by default.

## Enable

1. Install:

```bash
npm install primevue @primevue/nuxt-module @primeuix/themes primeicons
```

2. Merge the fragment in [`overlays/primevue/nuxt.fragment.ts`](../../overlays/primevue/nuxt.fragment.ts) into `nuxt.config.ts` (`modules` + `primevue` block).
3. Import theme/CSS as needed in `app.vue` or a layout.

## Notes

- Match house apps on PrimeVue 4 + `@primeuix/themes`.
- Keep product theming out of the template core until this overlay is intentionally enabled.
