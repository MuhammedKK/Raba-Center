# Phase 12: QA — Unit + E2E Test Suite Pass

## Status

Not Started

## Business

A dedicated final QA phase — rather than tests written once alongside each phase and never revisited — ensures the full user journeys still work correctly after all the polish and accessibility changes from Phases 10–11, which commonly introduce regressions in earlier phases' flows.

## User Story

As the development team, we want a complete, automated test suite covering every critical user journey in both languages, so that we can confidently demo or hand off the project knowing it actually works end-to-end, not just that it looks right.

## Acceptance Criteria

- [ ] Vitest/RTL unit coverage exists for all `shared/components/ui` primitives
- [ ] Unit coverage exists for all store logic (`cart`, `favorites`, `auth`)
- [ ] Playwright E2E specs cover: language switch + RTL layout assertion, browse → favorite → login → cart → checkout, all 3 contact form variants, branch locator WhatsApp/Maps link generation, blog navigation
- [ ] Critical E2E specs run parametrized over both `ar` and `en` locales
- [ ] `npm run verify` (lint + typecheck + unit + build) passes cleanly
- [ ] `npx playwright test` passes cleanly with `prefers-reduced-motion` forced to avoid animation-flakiness

## Expected Outcomes

A green, repeatable test suite covering the platform's critical business journeys in both languages, giving the team (and the client, if shown) confidence the demo is not just visually polished but functionally correct end-to-end.

## Task Checklist

- [ ] Unit tests for all UI primitives (Button, Card, Input, Modal, Tabs, etc.)
- [ ] Unit tests for `useAuthStore`, `useCartStore`, `useFavoritesStore`
- [ ] E2E: language switch + RTL layout assertion
- [ ] E2E: full course journey (browse → favorite → login redirect → cart → checkout)
- [ ] E2E: all 3 contact form submissions
- [ ] E2E: branch locator link generation
- [ ] E2E: blog navigation
- [ ] Reconcile MSW handlers so `browser.ts` (dev/Playwright) and `server.ts` (Vitest) never drift out of sync
- [ ] Add `npm run verify` script (lint + typecheck + unit + build)

## Notes / Risks

- E2E specs must be parametrized to run against both `ar` and `en`, not written once in a single language — this roughly doubles E2E runtime, budget for it.
- MSW handlers used in Playwright vs Vitest are two different setups (`browser.ts` vs `server.ts`) that can silently drift — define handlers once, from a single shared source, and import into both.
- Framer Motion transitions mid-flight can make carousel/animation-dependent E2E assertions flaky — force `prefers-reduced-motion` in the Playwright browser context to keep assertions deterministic.
