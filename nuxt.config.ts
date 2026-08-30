import { resolveRuntimeEnvironment } from './shared/utils/runtimeEnvironment';

const runtimeEnvironment = resolveRuntimeEnvironment(process.env);
const appEnv = process.env.NUXT_PUBLIC_APP_ENV || runtimeEnvironment.appEnv;
const sysEnv = runtimeEnvironment.sysEnv;
const nodeEnv = runtimeEnvironment.nodeEnv;
const deploymentTarget = process.env.NUXT_PUBLIC_DEPLOYMENT_TARGET || runtimeEnvironment.deploymentTarget;
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://127.0.0.1:3000';
const serverHost = process.env.NITRO_HOST || process.env.HOST || '127.0.0.1';
const serverPort = Number(process.env.PORT || process.env.NUXT_PORT || process.env.NITRO_PORT || 3000);
const nitroPreset = process.env.NITRO_PRESET || runtimeEnvironment.nitroPreset;

export default defineNuxtConfig({
  compatibilityDate: '2026-08-30',
  future: {
    compatibilityVersion: 4,
  },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/styles/main.scss'],
  devtools: { enabled: sysEnv === 'local' },
  devServer: {
    host: serverHost,
    port: serverPort,
  },
  nitro: {
    preset: nitroPreset,
  },
  runtimeConfig: {
    public: {
      appEnv,
      sysEnv,
      nodeEnv,
      deploymentTarget,
      siteUrl,
    },
  },
  typescript: {
    typeCheck: true,
    strict: true,
  },
  // Optional overlays (PrimeVue, Content/Image/i18n, PWA) stay disabled by default.
  // Enable via docs/overlays/*.md — do not uncomment without installing deps.
});
