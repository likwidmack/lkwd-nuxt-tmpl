/**
 * Optional PWA overlay — merge into nuxt.config.ts after installing @vite-pwa/nuxt.
 */
export const pwaOverlay = {
  modules: ['@vite-pwa/nuxt'],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'App',
      short_name: 'App',
      theme_color: '#0f1419',
    },
    workbox: {
      navigateFallback: '/',
    },
  },
} as const;
