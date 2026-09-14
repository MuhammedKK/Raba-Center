# Phase 6: Branches Locator

## Status

Done — city-grouped branch directory with a unified phone/hours banner, locale-aware WhatsApp and Google Maps deep links, and a city filter shipped in both locales.

## Business

A pediatric therapy center's physical accessibility — which city, how to get there, how to contact them directly — is a top decision factor for parents. This page directly drives phone/WhatsApp lead conversion, often before a parent ever fills out a form.

## User Story

As a parent deciding whether a branch is convenient for me, I want to see all branches grouped by city with their address and a direct way to contact or navigate to them, so that I can quickly decide where to go or who to contact.

## Acceptance Criteria

- [x] Branches render grouped by city/region with `CityFilterTabs`
- [x] Each `BranchCard` shows address, WhatsApp deep-link, and Google Maps link
- [x] A unified top-level phone/hours banner renders (`BranchesPhoneBanner`)
- [x] WhatsApp and Maps links are locale-aware (correct address text per language) — verified by unit test asserting the ar/en links actually differ
- [x] City filter tabs render in correct RTL/LTR order — plain `flex flex-wrap` pill row, no hardcoded physical direction, so it mirrors automatically under `dir="rtl"`
- [x] All content renders correctly in both `ar` and `en`

## Expected Outcomes

A scannable, city-grouped branch directory where every branch card's contact links work correctly, clearly demoable as a real lead-generation surface (not just static info).

## Task Checklist

- [x] `branches.api.ts` + MSW handler + seed data (4 branches across Riyadh/Jeddah/Dammam)
- [x] `BranchesPage`, `CityFilterTabs`, `BranchCard`, `BranchMapLink`, `WhatsAppButton` components (plus `BranchesPhoneBanner`)
- [x] Locale-aware link generation (Arabic address text in maps query for `ar`, English for `en`)
- [x] Branches page i18n keys (`branches.json`, both locales)
- [x] Unit test for WhatsApp/Maps link generation given branch data + locale (`branches.utils.test.ts`, 6 cases)

## Notes / Risks

- No real geolocation/backend — city list is static mock data; "nearest branch" auto-detection stayed explicitly out of scope per `PLAN.md` §9.
- `wa.me` deep-links (used here) degrade gracefully by design — they open WhatsApp Web when no app is installed, so no separate fallback was needed.
- **Link-generation logic kept locale-agnostic on purpose**: `buildWhatsAppLink(phone, message)` and `buildMapsLink(address)` in `branches.utils.ts` are pure string→URL functions with no i18n dependency — callers (`WhatsAppButton`, `BranchMapLink`) resolve the locale-correct text via `t()` first and pass plain strings in. This kept the unit tests trivial (no i18n mocking) while still proving the locale-aware requirement, by calling `i18n.getFixedT('ar'|'en', 'branches')` directly in the test and asserting the resulting links differ.
- The main phone number in `BranchesPhoneBanner` is a hardcoded literal (`+966 57 510 0100`), matching the same number already hardcoded in `Footer.tsx` from Phase 1 — pre-existing inconsistency (not i18n-driven, not centralized), not introduced by this phase. Worth centralizing into a shared constant if a real phone number is ever swapped in.
