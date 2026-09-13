# Phase 1: Design System & Global Layout

## Status

In Progress — core layout, primitives, and full route tree are built and verified via `npm run test:e2e`; `AccountLayout` and broader unit-test coverage across all primitives are still open.

## Business

The header, footer, and navigation are visible on every page of the pitch demo — they're the first thing a client evaluator sees and judges "premium" against. Building the reusable UI primitive library here, before any content page, prevents inconsistent one-off components from being built ad hoc in later phases.

## User Story

As a visitor (parent, prospective client, or business stakeholder), I want a consistent, polished navigation and layout on every page, with the ability to switch between Arabic and English, so that I can explore the site confidently in my preferred language and trust the brand's quality.

## Acceptance Criteria

- [x] `MainLayout` (Header + Footer + content outlet) wraps every public route
- [x] Header includes logo, nav menu, language switcher, and a mobile nav drawer
- [x] Mobile nav drawer opens from the correct side per direction (`inset-start` via logical properties, offscreen-X flips with `useDirection()`) and traps focus (implemented; not yet covered by a dedicated E2E assertion — see Notes)
- [x] `LanguageSwitcher` persists choice in `localStorage` (via i18next's `LanguageDetector` cache) and updates `dir` without a full page flash — verified in `e2e/flows/navigation.spec.ts`
- [x] Footer includes nav links, social links, and contact info strip
- [x] UI primitives (`Button`, `Card`, `Input`, `Select`, `Badge`, `Modal`, `Tabs`, `Skeleton`, `Toast`, `RatingStars`) exist in `shared/components/ui/`, exported from a barrel `index.ts`
- [x] Full route tree is navigable end-to-end via placeholder pages for every planned route — verified in `e2e/flows/navigation.spec.ts`
- [x] All layout chrome renders correctly in both `ar` (RTL) and `en` (LTR)

## Expected Outcomes

A fully clickable site skeleton: every planned page is reachable through real navigation (desktop and mobile), the language switcher flips the entire layout direction correctly, and a reusable design-system primitive library exists that every subsequent feature phase builds on top of instead of writing bespoke UI.

## Task Checklist

- [x] Build `Button`, `Card`, `Input`, `Select`, `Badge`, `Modal`, `Tabs`, `Skeleton`, `Toast`, `RatingStars` primitives
- [x] Build `Header`, `Footer`, `NavMenu`, `LanguageSwitcher`, `MobileNavDrawer`
- [x] Build `MainLayout` shell (locale-guarding: redirects to `/ar` if the `:locale` param is missing/unsupported, syncs `i18n.language` from the URL)
- [ ] Build `AccountLayout` shell (deferred to Phase 9, once Favorites/Cart/Checkout exist to lay out)
- [x] Wire full route tree with placeholder `PageScaffold`-based pages for every planned route
- [x] Add focus-trap + keyboard-close (`Escape`) behavior to `Modal` and `MobileNavDrawer`
- [ ] Unit tests for primitives (only `Button.test.tsx` written so far — extend to `Card`, `Input`, `Select`, `Modal`, `Tabs`, `RatingStars`, `Toast` in a follow-up pass)

## Notes / Risks

- Designing the `Card` primitive generically enough to serve ~10 later variants (service card, course card, trainer card, blog card, branch card) without prop-explosion is the key design decision in this phase — get its composition API right here. Current shape (`Card`, `Card.Media`, `Card.Body`, `Card.Footer`) is intentionally minimal; revisit if Phase 5's course card needs force it wider.
- Language switcher must not cause a flash-of-wrong-direction on load — this bit us for real: `i18next-browser-languagedetector`'s one-time path detection ran before React Router's client-side redirect resolved, so a hard load of `/` briefly booted in the browser's language. Fixed in `MainLayout` by treating the `:locale` URL segment as the source of truth (see `phases/00-foundation` Notes for the full writeup). Any future route added outside `MainLayout`'s `:locale` subtree must re-implement this sync or reuse `MainLayout`.
- Mobile nav drawer focus-trap and RTL-slide-direction are implemented but only manually reasoned about, not yet asserted by an E2E test — worth a dedicated spec before Phase 11's accessibility pass rather than leaving it as the first thing discovered broken there.
