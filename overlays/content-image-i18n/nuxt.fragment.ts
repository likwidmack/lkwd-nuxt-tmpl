/**
 * Optional Content + Image + i18n overlay — merge into nuxt.config.ts after installing deps.
 */
export const contentImageI18nOverlay = {
  modules: ['@nuxt/content', '@nuxt/image', '@nuxtjs/i18n'],
  i18n: {
    defaultLocale: 'en',
    locales: [{ code: 'en', name: 'English' }],
  },
} as const;
