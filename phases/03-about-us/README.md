# Phase 3: About Us

## Status

Done — mission/vision, org stats (reused Phase 2 counter, promoted to `shared/`), team grid with expand-to-modal bios, and certifications/values shipped in both locales.

## Business

For a medical/therapy service, parents evaluate trustworthiness before booking. The About page establishes credibility through mission/vision, credentials, and real staff bios — it's a key trust-building step in the conversion funnel, second only to Services.

## User Story

As a parent researching therapy options, I want to learn about the center's mission, track record, and the qualifications of its staff, so that I can trust them with my child's care before reaching out.

## Acceptance Criteria

- [x] Mission/vision section renders
- [x] Org stats (satisfaction %, effectiveness %, improvement %) reuse the Phase 2 `AnimatedStatsCounter` component without duplication (promoted from `features/home` to `shared/components/composed` since it's now used by two features)
- [x] `TeamGrid` renders `TeamBioCard`s with photo, name, credentials, specialty
- [x] Each team bio supports an "expand for full bio" interaction (`Modal`, reused as-is from Phase 1's design system — same pattern to reuse in Phase 5 for trainers)
- [x] Certifications/values section renders
- [x] All content renders correctly in both `ar` and `en`

## Expected Outcomes

A credibility-focused About page that reuses Phase 1/2 components (stats counter, cards) rather than duplicating them, confirming the design system's components are generic enough for cross-phase reuse.

## Task Checklist

- [x] `MissionVision`, `OrgStats`, `CertificationsList` components
- [x] `TeamGrid`, `TeamBioCard` components with expand pattern
- [x] About page i18n keys (`about.json`, both locales)
- [x] Team photography sourced (4 Pexels portraits, self-hosted in `src/assets/images/team/`) — see Notes on the real-photo-vs-invented-bio judgment call
- [x] Unit test for bio expand/collapse interaction (`TeamBioCard.test.tsx`)

## Notes / Risks

- Confirms whether the Phase 1/2 component APIs were designed generically enough — the stats counter and `Card`/`Modal` primitives all reused without any modification, which is a good signal for Phase 5 (Trainers) building on the same patterns.
- Bio expand pattern decided as **modal** (reusing Phase 1's `Modal` component unchanged) — Phase 5 (Trainers) should follow the same pattern for trainer profiles rather than introducing an inline-expand variant.
- Team member photos are real Pexels stock portraits, unlike testimonials (which deliberately use illustrated initials-avatars per the Phase 2 follow-up decision). Judgment call: staff/team photography is standard industry practice for demo sites and isn't attributing a personal quote/endorsement to a stranger's photo — it's just standing in for "this role exists at the center," the same way `raba-center.com` itself uses real staff photography. Flagging this distinction explicitly rather than treating all stock photography the same way.
- Data now flows through `teamApi`/`valuesApi` + MSW handlers (not hardcoded), consistent with the "all data access goes through `src/api/`" architecture principle — even for content (mission text, values) that could arguably be static, list-shaped content with real ids (team, values) goes through the mock API layer for consistency with courses/testimonials/accreditations.
