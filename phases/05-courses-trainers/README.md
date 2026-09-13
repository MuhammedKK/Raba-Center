# Phase 5: Courses & Programs Catalog + Trainers

## Status

Not Started

## Business

Courses and Trainers are built together because a course detail page references its instructor — building them separately would create a circular dependency. This phase is also the most complex "e-commerce-like" surface in the app, and is where the platform demonstrates real depth (not just a brochure site) to a pitch audience.

## User Story

As a parent researching therapy options, I want to browse available programs with pricing/duration/trainer info, save ones I'm considering, and enroll, so that I can make an informed decision without needing to call the center first.

## Acceptance Criteria

- [ ] Course list page renders all seeded courses with rating, price, and duration
- [ ] Filter by category and price range updates the URL (shareable/bookmarkable, back-button correct)
- [ ] Course detail page shows curriculum modules, a trainer reference card, and price
- [ ] "Add to favorites" persists across reload (allowed while unauthenticated)
- [ ] "Enroll" redirects unauthenticated users to `/login` and returns them to the course afterward (`redirectTo` pattern)
- [ ] Trainer directory page and trainer detail view render seeded profiles, reusing the Phase 3 bio-expand pattern
- [ ] All content renders correctly in both `ar` (RTL) and `en` (LTR)
- [ ] Lighthouse accessibility score ≥ 90 on both course list and detail pages

## Expected Outcomes

A fully clickable, bilingual course catalog and trainer directory, backed by mock data through the `api/` abstraction layer, demonstrable end-to-end in a client walkthrough: browse → filter → favorite → attempt enroll → login redirect → cart.

## Task Checklist

- [ ] `courses.api.ts` + MSW handler + seed data
- [ ] `trainers.api.ts` + MSW handler + seed data
- [ ] `CourseCard`, `CourseFilterBar`, `CourseCurriculumList` components
- [ ] `TrainerCard`, trainer profile view (reusing Phase 3 bio-expand pattern)
- [ ] `useCourses`, `useCourse`, `useCourseFilters` hooks (URL-synced filter state)
- [ ] `CoursesListPage`, `CourseDetailPage`, `TrainersPage` routes
- [ ] Favorites integration (`useFavoritesStore`)
- [ ] Auth-gated enroll → login → return flow
- [ ] Unit tests for filter logic and favorite toggle
- [ ] i18n keys added to `courses.json` / `trainers.json` (both locales)

## Notes / Risks

- The auth-gating "enroll" flow (redirect to login, then return with intent preserved) is the first real cross-feature state machine in the app — test it explicitly with a dedicated E2E-style walkthrough before moving on.
- Filter state (category/price/duration) must live in URL search params, not component state, so filtered views are shareable and back-button-correct — a common and costly retrofit if skipped now.
- This is the first phase to exercise Zustand's `persist` middleware with real UI — confirm favorites/cart correctly rehydrate on page reload before Phase 9 builds more on top of it.
