# Phase 4: Services

## Status

Done — 6-service grid with icons, per-service CTA → Contact query-param handoff, and a closing assessment banner shipped in both locales. Not covered by unit tests per user request; visual verification is manual.

## Business

Services are the core "product" of the business (ABA therapy, speech & language therapy, assessment & diagnosis, home services, shadow-teacher, branches). This page is the primary conversion funnel into the Contact/booking forms in Phase 8.

## User Story

As a parent evaluating therapy options, I want to see a clear breakdown of the specific services offered, so that I can identify which one fits my child's needs and take the next step to book or inquire.

## Acceptance Criteria

- [x] `ServiceGrid` renders 6 `ServiceCard`s (icon, title, description, CTA) from mock data
- [x] Each service CTA routes to the Contact page with the service type pre-selected (via `?service=<id>` query param)
- [x] Page is a single page with an anchor-able services section (`id="services"`), not one detail page per service
- [x] Icon/illustration set is visually cohesive (lucide-react icons on a consistent primary→accent gradient badge)
- [x] All content renders correctly in both `ar` and `en`

## Expected Outcomes

A clear, scannable services page where every CTA correctly hands off context to the Contact form, demonstrating the first working cross-feature integration in the app (Services → Contact).

## Task Checklist

- [x] `ServiceGrid`, `ServiceCard`, `ServiceCtaBanner` components (plus `ServicesHero`)
- [x] Service mock data + `services.api.ts`/MSW handler covering all 6 services (ABA, speech, assessment, home services, shadow teacher, branches)
- [x] Query-param pattern for passing service context to Contact: `Link to={\`/${locale}/contact?service=${service.id}\`}`— Phase 8's`ContactPage`reads`?service=`from`useSearchParams` to pre-select the inquiry type
- [x] Services page i18n keys (`services.json`, both locales)

## Notes / Risks

- Single-page-with-anchors vs one-page-per-service is a deliberate scope-control decision for v1 — do not silently expand into per-service detail pages without revisiting `PLAN.md` §9 (Open Decisions).
- The CTA → Contact context-passing pattern established here is the first cross-feature integration point in the app; kept simple (query param) so it's easy to extend. `ContactPage` itself is still the Phase 8 placeholder — it doesn't read `?service=` yet, only the outbound link exists so far. Phase 8 must implement the read side of this contract, not invent a new one.
- Extended `AnimatedSection` (shared, Phase 1) with an optional `id` prop to support the anchor-section requirement — a small, backwards-compatible addition, not a breaking change to its existing callers.
- Per user instruction, this phase skipped adding a Vitest unit test and skipped automated screenshot/E2E verification — verification is manual, in-browser, by the user.
