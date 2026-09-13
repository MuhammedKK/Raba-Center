# Phase 4: Services

## Status

Not Started

## Business

Services are the core "product" of the business (ABA therapy, speech & language therapy, assessment & diagnosis, home services, shadow-teacher, branches). This page is the primary conversion funnel into the Contact/booking forms in Phase 8.

## User Story

As a parent evaluating therapy options, I want to see a clear breakdown of the specific services offered, so that I can identify which one fits my child's needs and take the next step to book or inquire.

## Acceptance Criteria

- [ ] `ServiceGrid` renders 5–6 `ServiceCard`s (icon, title, description, CTA) from mock data
- [ ] Each service CTA routes to the Contact page with the service type pre-selected (via route state or query param)
- [ ] Page is a single page with anchor sections (not one detail page per service) for v1 scope
- [ ] Icon/illustration set is visually cohesive across all service cards
- [ ] All content renders correctly in both `ar` and `en`

## Expected Outcomes

A clear, scannable services page where every CTA correctly hands off context to the Contact form, demonstrating the first working cross-feature integration in the app (Services → Contact).

## Task Checklist

- [ ] `ServiceGrid`, `ServiceCard`, `ServiceCtaBanner` components
- [ ] Service mock data (`services.data.ts` or MSW handler) covering all 5–6 services
- [ ] Query-param/route-state pattern for passing service context to Contact (Phase 8 depends on this)
- [ ] Services page i18n keys (`services.json`, both locales)

## Notes / Risks

- Single-page-with-anchors vs one-page-per-service is a deliberate scope-control decision for v1 — do not silently expand into per-service detail pages without revisiting `PLAN.md` §9 (Open Decisions).
- The CTA → Contact context-passing pattern established here is the first cross-feature integration point in the app; keep it simple (query param) so it's easy to extend.
