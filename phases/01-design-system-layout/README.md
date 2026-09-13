# Phase 1: Design System & Global Layout

## Status

Done

## Business

The header, footer, and navigation are visible on every page of the pitch demo — they're the first thing a client evaluator sees and judges "premium" against. Building the reusable UI primitive library here, before any content page, prevents inconsistent one-off components from being built ad hoc in later phases.

## User Story

As a visitor (parent, prospective client, or business stakeholder), I want a consistent, polished navigation and layout on every page, with the ability to switch between Arabic and English, so that I can explore the site confidently in my preferred language and trust the brand's quality.

## Acceptance Criteria

- [x] `MainLayout` (Header + Footer + content outlet) wraps every public route
- [x] Header includes logo, nav menu, language switcher, and a mobile nav drawer
- [x] Mobile nav drawer opens from the correct side per direction (`inset-start` via logical properties, offscreen-X flips with `useDirection()`) and traps focus — verified in `e2e/flows/mobile-nav.spec.ts` (RTL/LTR side, Escape-to-close, focus returns to the trigger)
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
- [x] Build `AccountLayout` shell (sub-nav tabs for Favorites/Cart, `Outlet` for the account pages; Checkout is nested under it too but not tab-linked since it's reached from Cart, not browsed directly)
- [x] Wire full route tree with placeholder `PageScaffold`-based pages for every planned route
- [x] Add focus-trap + keyboard-close (`Escape`) behavior to `Modal` and `MobileNavDrawer`, extracted into a shared `useFocusTrap` hook to avoid duplicating the trap/restore logic
- [x] Unit tests for primitives — all of `Button`, `Card`, `Input`, `Select`, `Badge`, `Skeleton`, `Modal`, `Tabs`, `Toast`, `RatingStars` plus the new `useFocusTrap` hook now have coverage (29 tests total)

## Notes / Risks

- Designing the `Card` primitive generically enough to serve ~10 later variants (service card, course card, trainer card, blog card, branch card) without prop-explosion is the key design decision in this phase — get its composition API right here. Current shape (`Card`, `Card.Media`, `Card.Body`, `Card.Footer`) is intentionally minimal; revisit if Phase 5's course card needs force it wider.
- Language switcher must not cause a flash-of-wrong-direction on load — this bit us for real: `i18next-browser-languagedetector`'s one-time path detection ran before React Router's client-side redirect resolved, so a hard load of `/` briefly booted in the browser's language. Fixed in `MainLayout` by treating the `:locale` URL segment as the source of truth (see `phases/00-foundation` Notes for the full writeup). Any future route added outside `MainLayout`'s `:locale` subtree must re-implement this sync or reuse `MainLayout`.
- **Found while writing the E2E spec**: `MobileNavDrawer` never actually implemented a focus trap or focus-restore — it only closed on `Escape`, unlike `Modal` which had the full Tab-cycling/restore logic. The phase doc had claimed "traps focus correctly" before this was true. Fixed by extracting `Modal`'s trap logic into a shared `shared/hooks/useFocusTrap.ts` hook and using it in both `Modal` and `MobileNavDrawer`, so the behavior can't drift apart between the two again. Covered by `useFocusTrap.test.tsx` (unit) and `e2e/flows/mobile-nav.spec.ts` (RTL/LTR side + focus-restore-to-trigger, real browser).
- `AccountLayout` currently only provides a Favorites/Cart tab strip; it does not yet gate access behind auth (no `AuthGuard` exists until Phase 9) — anyone can currently reach `/ar/favorites` or `/ar/cart` directly, which is expected for this stage but should not be mistaken for the finished access-control story.
