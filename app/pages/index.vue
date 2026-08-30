<script setup lang="ts">
const config = useRuntimeConfig();

useSeoMeta({
  title: 'lkwd-nuxt-tmpl',
  description: 'Likwid Nuxt 4 house template — Pug, SCSS, tooling, dual agent surfaces.',
});
</script>

<template lang="pug">
main.page
  .shell
    p.eyebrow lkwd-nuxt-tmpl
    h1 House Nuxt template
    p.lede
      | Pug + SCSS starter with house tooling, SYS_ENV matrix, Playwright, and dual agent surfaces.
    dl.meta
      dt SYS_ENV
      dd {{ config.public.sysEnv }}
      dt app env
      dd {{ config.public.appEnv }}
      dt deploy target
      dd {{ config.public.deploymentTarget }}
</template>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
}

.shell {
  max-width: 36rem;
}

.eyebrow {
  margin: 0 0 0.75rem;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-muted);
}

h1 {
  margin: 0 0 0.75rem;
  font-size: clamp(2rem, 4vw, 2.75rem);
  line-height: 1.1;
  font-weight: 650;
}

.lede {
  margin: 0 0 1.5rem;
  color: var(--color-muted);
  line-height: 1.55;
}

.meta {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.35rem 1rem;
  margin: 0;
  font-size: 0.9rem;

  dt {
    margin: 0;
    color: var(--color-muted);
  }

  dd {
    margin: 0;
    font-family: var(--font-mono);
  }
}
</style>
