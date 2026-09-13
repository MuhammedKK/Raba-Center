# Phase 6: Branches Locator

## Status

Not Started

## Business

A pediatric therapy center's physical accessibility — which city, how to get there, how to contact them directly — is a top decision factor for parents. This page directly drives phone/WhatsApp lead conversion, often before a parent ever fills out a form.

## User Story

As a parent deciding whether a branch is convenient for me, I want to see all branches grouped by city with their address and a direct way to contact or navigate to them, so that I can quickly decide where to go or who to contact.

## Acceptance Criteria

- [ ] Branches render grouped by city/region with `CityFilterTabs`
- [ ] Each `BranchCard` shows address, WhatsApp deep-link, and Google Maps link
- [ ] A unified top-level phone/hours banner renders
- [ ] WhatsApp and Maps links are locale-aware (correct address text per language)
- [ ] City filter tabs render in correct RTL/LTR order
- [ ] All content renders correctly in both `ar` and `en`

## Expected Outcomes

A scannable, city-grouped branch directory where every branch card's contact links work correctly, clearly demoable as a real lead-generation surface (not just static info).

## Task Checklist

- [ ] `branches.api.ts` + MSW handler + seed data (grouped by city)
- [ ] `BranchesPage`, `CityFilterTabs`, `BranchCard`, `BranchMapLink`, `WhatsAppButton` components
- [ ] Locale-aware link generation (Arabic address text in maps query for `ar`, English for `en`)
- [ ] Branches page i18n keys (`branches.json`, both locales)
- [ ] Unit test for WhatsApp/Maps link generation given branch data + locale

## Notes / Risks

- No real geolocation/backend — city list is static mock data; "nearest branch" auto-detection is explicitly out of scope per `PLAN.md` §9, don't silently add it.
- WhatsApp deep-links must degrade gracefully when opened outside a WhatsApp-installed context.
