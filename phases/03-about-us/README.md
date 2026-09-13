# Phase 3: About Us

## Status

Not Started

## Business

For a medical/therapy service, parents evaluate trustworthiness before booking. The About page establishes credibility through mission/vision, credentials, and real staff bios — it's a key trust-building step in the conversion funnel, second only to Services.

## User Story

As a parent researching therapy options, I want to learn about the center's mission, track record, and the qualifications of its staff, so that I can trust them with my child's care before reaching out.

## Acceptance Criteria

- [ ] Mission/vision section renders
- [ ] Org stats (satisfaction %, effectiveness %, improvement %) reuse the Phase 2 `AnimatedStatsCounter` component without duplication
- [ ] `TeamGrid` renders `TeamBioCard`s with photo/illustration, name, credentials, specialty
- [ ] Each team bio supports an "expand for full bio" interaction (modal or inline expand — one pattern, reused in Phase 5 for trainers)
- [ ] Certifications/values section renders
- [ ] All content renders correctly in both `ar` and `en`

## Expected Outcomes

A credibility-focused About page that reuses Phase 1/2 components (stats counter, cards) rather than duplicating them, confirming the design system's components are generic enough for cross-phase reuse.

## Task Checklist

- [ ] `MissionVision`, `OrgStats`, `CertificationsList` components
- [ ] `TeamGrid`, `TeamBioCard` components with expand pattern
- [ ] About page i18n keys (`about.json`, both locales)
- [ ] Placeholder team photography/illustration strategy (premium-looking, not obviously stock/lorem)
- [ ] Unit test for bio expand/collapse interaction

## Notes / Risks

- Confirms whether the Phase 1/2 component APIs were designed generically enough — if `Card` or the stats counter need modification here, that's a signal the Phase 1 API needs revisiting before more phases build on it.
- Decide the bio expand pattern (modal vs inline) once here since Phase 5 (Trainers) reuses it — don't let it diverge.
