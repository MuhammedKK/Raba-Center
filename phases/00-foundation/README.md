# Phase 0: Foundation & Tooling

## Status

Done

## Business

Nothing ships without a correctly configured base. Getting internationalization/RTL support and the mock-API abstraction right at the very start avoids expensive retrofits later — every other phase's velocity and quality depends on this phase being solid. This is also where the "swap in a real backend later with zero refactor" promise to the client is actually made true or false.

## User Story

As the development team, we want a fully configured Vite + React + TypeScript + Tailwind project with linting, testing, i18n/RTL, and a mock-API layer wired end-to-end, so that every subsequent phase can build features on a stable, scalable, standards-compliant foundation.

## Acceptance Criteria

- [x] `npm run dev` boots a working app with no console errors
- [x] Tailwind v4 `@theme` design tokens (colors, fonts) from `PLAN.md` §7 are wired and usable
- [x] Language switcher toggles `dir="rtl"`/`dir="ltr"` on `<html>` and persists the choice
- [x] i18next loads `ar` (default) and `en` namespaces without errors
- [x] MSW intercepts at least one real `fetch` call end-to-end in dev, proven via a placeholder handler
- [x] `src/api/client.ts` base HTTP wrapper exists and is the only place raw `fetch` is called
- [x] Full `src/` folder skeleton from `PLAN.md` §5 exists
- [x] `npm run lint`, `npm run typecheck`, `npm run test` (Vitest smoke test), `npx playwright test` (navigation spec) all pass
- [x] Husky pre-commit hook runs lint-staged (configured; verify on first real commit)

## Expected Outcomes

A blank-but-fully-wired app: navigable to a placeholder home route, language switcher works and flips layout direction, one proof-of-concept mock API call resolves through MSW, and the full tooling chain (lint/typecheck/unit/E2E) is green. This is the base every later phase builds directly on top of.

## Task Checklist

- [x] Scaffold Vite + React + TS (`npm create vite@latest`)
- [x] Install and configure Tailwind CSS v4 with `@theme` tokens
- [x] Install React Router (v8, current major at build time — see Notes), set up `app/router/routes.tsx` + `routePaths.ts`
- [x] Install and configure i18next + react-i18next, `ar`/`en` locale stubs, path-prefixed routing
- [x] Install Zustand (dependency installed; stores land per-feature starting Phase 9)
- [x] Install Framer Motion, React Hook Form + Zod, lucide-react
- [x] Install and configure `@fontsource` packages for Sora, Inter, IBM Plex Sans Arabic
- [x] Install `vite-imagetools` + `vite-plugin-image-optimizer` (+ `svgo`/`sharp` peer deps)
- [x] Install and configure MSW (`browser.ts`, `server.ts`, one handler, one seed data file)
- [x] Configure ESLint 9 flat config + typescript-eslint + react-hooks + jsx-a11y + import-x ordering
- [x] Configure Prettier + `prettier-plugin-tailwindcss`
- [x] Configure Husky + lint-staged
- [x] Configure Vitest + React Testing Library + one smoke test (`Button.test.tsx`)
- [x] Configure Playwright + navigation spec (locale redirect, language switch, full nav sweep) — passing against a production build
- [x] Create full `src/` folder skeleton
- [x] `git init` and initial commit

## Notes / Risks

- Tailwind v4's CSS-first `@theme` config combined with logical-property RTL flipping needs to be verified against a real RTL page early, not assumed — a component that hardcodes `ml-*`/`pl-*` will silently break in Arabic.
- MSW's service-worker-in-dev vs Node-interceptor-in-tests split (`browser.ts` vs `server.ts`) is easy to misconfigure and can silently fall back to real network calls — verify both paths explicitly.
- The i18next namespace-loading strategy (static import vs HTTP backend) must be decided now since it affects the `mocks/`-vs-`i18n/locales/` build pipeline for every later phase. **Resolved**: static JSON imports per locale/namespace, loaded synchronously at `i18n/index.ts` init.
- **Found during E2E verification**: `i18next-browser-languagedetector`'s path-based detection only runs once at boot, before React Router's client-side `/` → `/ar` redirect happens — so the app booted in the visitor's browser language instead of the URL locale. Fixed by making `MainLayout` sync `i18n.language` from the `:locale` route param on every render (URL is the single source of truth for locale, matching the `PLAN.md` §4 routing decision) and by calling `applyDirection()` once after `i18n.init()` resolves, not only on the `languageChanged` event. Also learned: `vite preview` serves whatever `dist/` was last built — Playwright runs against a stale build unless `npm run build` is re-run first (the current `test:e2e` script assumes a fresh build; worth folding a `pretest:e2e: npm run build` script in later if this trips someone up again).
- **Package versions actually resolved at install time were newer than planned**: Vite 8 (not 6), React Router 8 (not 7), TypeScript ~6.0 (not 5.6), ESLint had to be pinned to `^9` (project scaffolder defaults to ESLint 10, which several plugins — `eslint-plugin-jsx-a11y`, `eslint-plugin-import`/`import-x` — don't yet support via peer deps). `eslint-plugin-import` itself was swapped for `eslint-plugin-import-x` (flat-config/ESLint 9 compatible fork). `lucide-react`'s current major dropped all brand/logo icons (Facebook, Instagram, LinkedIn, X/Twitter) — replaced with a small local `SocialIcon` component (inline SVG) in `shared/components/ui/`.
