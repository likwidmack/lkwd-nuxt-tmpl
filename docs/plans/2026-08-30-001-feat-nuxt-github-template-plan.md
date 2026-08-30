---
title: Nuxt GitHub Template House Kit - Plan
date: 2026-08-30
artifact_contract: ce-unified-plan/v1
artifact_readiness: requirements-only
product_contract_source: ce-brainstorm
execution: code
status: requirements-only
---

# Nuxt GitHub Template House Kit - Plan

## Goal Capsule

- **Objective:** Ship `lkwd-nuxt-tmpl` as a GitHub template repository: a thin Nuxt 4 house starter that clones into a working app with house tooling, Pug/SCSS, env matrix, Playwright, CI, and dual agent surfaces.
- **Product authority:** Confirmed brainstorm (2026-08-30). Opinionated greenfield house kit; not a fork of an existing product app.
- **Open blockers:** None for v1 scope. Enabling “Template repository” in GitHub settings is a post-push checklist item.

## Product Contract

### Problem and outcome

Starting a new Nuxt app today means re-assembling house conventions by hand (Pug, SCSS, env matrix, lint, agents, CI). This template makes that kit cloneable once so new apps start aligned without carrying product-domain weight.

### Primary actor

You (and future you), cloning this template for new Likwid / personal Nuxt apps.

### Approach

Thin house kit + optional overlays (Approach A). Always-on core stays general-purpose; optional packs live in-repo but off by default.

### Key Decisions

- KD1. Opinionated greenfield baseline over mirroring one existing repo. (session-settled: user-directed — chosen over mirror/compose-from-list: prefer a clean proposed stack)
- KD2. General-purpose starter first; SSR/PWA/cloud as a secondary layer. (session-settled: user-directed — chosen over content/SaaS-first archetypes)
- KD3. Optional overlays wired in-repo, off by default. (session-settled: user-directed — chosen over core-only docs or on-by-default)
- KD4. Provider-agnostic core identity with AWS as the primary optional deploy recipe. (session-settled: user-approved — chosen over AWS-only or equal multi-provider stubs)
- KD5. Always-on floor: tooling, agent rules, Pug, SCSS, CI; plus Node 26, house `SYS_ENV` matrix, and always-on Playwright. (session-settled: user-directed)
- KD6. Dual agent surfaces: canonical shared policy in `.agent/`, root `AGENTS.md` stub for auto-discovery, plus thin `.cursor/rules/` and `.codex/`. (session-settled: user-directed — chosen over thin AGENTS-only or deferral; layout refined to `.agent/` + stub)
- KD7. PrimeVue, Content/Image/i18n, PWA, and AWS/Docker deploy stubs are optional overlays — not clone defaults. (session-settled: user-directed — revises “floor + PrimeVue always-on”)
- KD8. Lean single-app layout, not an Nx monorepo. (session-settled: user-approved via Approach A)

### Requirements

- R1. Fresh clone installs with npm and runs a Nuxt 4 SSR app with TypeScript strict.
- R2. Vue SFCs use Pug templates and SCSS; Prettier includes the Pug plugin; ESLint supports Pug templates.
- R3. Node engine and `.nvmrc` target Node 26.
- R4. Runtime env uses house `SYS_ENV` ∈ `local` | `image` | `server` and Node lifecycle ∈ `development` | `test` | `production`.
- R5. Husky + lint-staged, ESLint, and Prettier run as house tooling.
- R6. Vitest unit tests and Playwright e2e smoke tests are always wired and runnable via npm scripts.
- R7. GitHub Actions CI runs lint, typecheck, unit tests, and e2e (as appropriate for a PR check).
- R8. `.agent/AGENTS.md` is the canonical shared policy; root `AGENTS.md` is a universal stub; `.cursor/rules/` and `.codex/` stay thin harness surfaces.
- R9. Sample `app/` page demonstrates Pug + SCSS; `shared/` holds env helpers as needed.
- R10. README documents “Use this template” usage and how to enable optional overlays.
- R11. Optional overlays (PrimeVue; Content + Image + i18n; PWA; AWS-primary SAM/CD stubs; Docker stubs) exist in-repo, documented, and disabled by default.
- R12. Repo remains usable as a GitHub template without product/domain content from other apps.

### Scope Boundaries

**In scope**

- Always-on core listed above
- Dual agent surfaces
- Documented optional overlays
- GitHub template README / settings checklist

**Deferred / optional overlays (not default)**

- PrimeVue 4 + themes/icons
- `@nuxt/content`, `@nuxt/image`, `@nuxtjs/i18n`
- `@vite-pwa/nuxt`
- AWS SAM / CD stubs and Docker compose stubs
- Light Nitro notes for non-AWS hosts

**Outside this product’s identity**

- Nx monorepo, Storybook, Pinia-by-default, admin auth, full Dynamo/Postgres matrix
- Equal first-class Cloudflare/Vercel deploy tracks
- Product/strategy content from other applications

### Acceptance Examples

- AE1. `npm i` then `npm run dev` serves a Pug+SCSS sample page.
- AE2. `npm run lint`, `npm run typecheck`, `npm test`, and `npm run test:e2e` succeed on a clean clone.
- AE3. CI passes on a PR with the same quality gates.
- AE4. Optional overlays remain off unless explicitly enabled per overlay docs.
- AE5. Cursor and Codex both have thin project guidance rooted in `.agent/AGENTS.md` via the root stub.

### Success criteria

Clone → install → develop/lint/typecheck/unit/e2e/CI works with house conventions present and optional packs clearly gated.
