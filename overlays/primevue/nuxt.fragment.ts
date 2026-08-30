/**
 * Optional PrimeVue overlay — merge into nuxt.config.ts after installing deps.
 * Do not import this file from the always-on config.
 */
export const primevueOverlay = {
  modules: ['@primevue/nuxt-module'],
  primevue: {
    options: {
      theme: {
        // import Aura (or another preset) from '@primeuix/themes' in nuxt.config
      },
    },
  },
} as const;
