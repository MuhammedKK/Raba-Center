# Phase 5: Courses & Programs Catalog + Trainers

## Status

Done — course catalog with URL-synced filters, course detail with curriculum + trainer reference, trainer directory + profile, favorites (Zustand persist), and auth-gated enroll→login→return flow shipped in both locales. Lighthouse accessibility audit not run this session (see Notes) — manual verification left to the user.

## Business

Courses and Trainers are built together because a course detail page references its instructor — building them separately would create a circular dependency. This phase is also the most complex "e-commerce-like" surface in the app, and is where the platform demonstrates real depth (not just a brochure site) to a pitch audience.

## User Story

As a parent researching therapy options, I want to browse available programs with pricing/duration/trainer info, save ones I'm considering, and enroll, so that I can make an informed decision without needing to call the center first.

## Acceptance Criteria

- [x] Course list page renders all seeded courses with rating, price, and duration
- [x] Filter by category and price range updates the URL (shareable/bookmarkable, back-button correct) — `useCourseFilters` reads/writes `?category=`/`?maxPrice=` via `useSearchParams`
- [x] Course detail page shows curriculum modules, a trainer reference card, and price
- [x] "Add to favorites" persists across reload (allowed while unauthenticated) — `useFavoritesStore` (Zustand `persist`, localStorage), verified by unit test including the actual persisted payload
- [x] "Enroll" redirects unauthenticated users to `/login` and returns them to the course afterward (`redirectTo` pattern)
- [x] Trainer directory page and trainer detail view render seeded profiles, reusing the Phase 3 bio pattern (photo + credentials + specialty + full bio)
- [x] All content renders correctly in both `ar` (RTL) and `en` (LTR)
- [ ] Lighthouse accessibility score ≥ 90 on both course list and detail pages — not run this session (no browser automation was used per standing instruction to keep verification manual); recommend running `npm run test:e2e` or a Lighthouse pass on these two routes before treating this criterion as met

## Expected Outcomes

A fully clickable, bilingual course catalog and trainer directory, backed by mock data through the `api/` abstraction layer, demonstrable end-to-end in a client walkthrough: browse → filter → favorite → attempt enroll → login redirect → cart.

## Task Checklist

- [x] `courses.api.ts` + MSW handler + seed data (extended with `description`, `curriculum`, `trainerId`)
- [x] `trainers.api.ts` + MSW handler + seed data
- [x] `CourseCard`, `CourseFilterBar`, `CourseCurriculumList` components (plus `TrainerRefCard`)
- [x] `TrainerCard`, trainer profile view (full-page `TrainerDetailPage`, not a modal — see Notes)
- [x] `useCourses`, `useCourse`, `useCourseFilters` hooks (URL-synced filter state), plus `useTrainers`/`useTrainer`
- [x] `CoursesListPage`, `CourseDetailPage`, `TrainersPage` routes, plus `TrainerDetailPage` (new route, `trainerDetail` path already existed in `routePaths`)
- [x] Favorites integration (`useFavoritesStore`) — `FavoriteButton` wired into `CourseCard` and the course detail hero; minimal `FavoritesPage` pulled forward from Phase 9 to close the demo loop (browse → favorite → view in Favorites)
- [x] Auth-gated enroll → login → return flow — minimal `useAuthStore` (mock login, no real credentials) + a minimal `LoginPage`; full account UI/profile stays Phase 9 scope
- [x] Unit tests for filter logic (`courses.utils.test.ts`, 6 cases) and favorite toggle (`useFavoritesStore.test.ts`, 5 cases including persisted-payload verification)
- [x] i18n keys added to `courses.json` / `trainers.json` (both locales), plus a new `account.json` namespace for the minimal login/favorites copy

## Notes / Risks

- The auth-gating "enroll" flow (redirect to login, then return with intent preserved) is the first real cross-feature state machine in the app. It was NOT verified via an E2E walkthrough this session (only unit-tested at the store level) per the standing instruction to keep verification manual/user-driven — recommend the user click through browse → enroll → login → return once before Phase 9 builds more account UI on top of it.
- Filter state lives in URL search params via `useCourseFilters`/`useSearchParams`, not component state, so filtered views are shareable and back-button-correct.
- **Trainers reuse About page content, not new copy**: `trainers.data.ts` stores i18n keys pointing into the `about` namespace (`about:team.members.<id>.*`) rather than duplicating name/role/credentials/specialty/bio in `trainers.json`, because the four trainers _are_ the same clinical team introduced in Phase 3 — the center's own specialists teach the certification courses. `trainers.json` only holds page-chrome strings (eyebrow/title/"view profile"). If a future phase needs a trainer who isn't also a team member, give them their own keys in `trainers.json` instead of forcing the cross-namespace pattern.
- **Bio-expand pattern reused, but not verbatim**: Phase 3's `Modal`-based expand made sense for a same-page team grid; Trainers already has a dedicated detail route (`trainerDetail` was already in `routePaths`), so `TrainerDetailPage` reuses the same _content layout_ (photo, credentials, specialty, full bio) as a full page rather than a modal. Card → full page is the richer pattern; use it for any future profile-style content instead of retrofitting a modal.
- **Auth/Favorites scope**: this phase builds real `useFavoritesStore` (Zustand `persist`) and a real, minimal `useAuthStore` + `LoginPage`/`FavoritesPage` — enough to make the enroll-gating and favorites-persist acceptance criteria genuinely true, not stubbed. Phase 9 ("Account Layer") still owns the full account experience: profile UI, logout, Cart, Checkout, and polishing Login/Favorites beyond this minimal slice. Don't mistake this phase's `LoginPage` for the final one.
- **Node 25 test-environment bug found and fixed**: Node's own unconfigured global `localStorage` (no `--localstorage-file`) is a broken stub whose methods all throw/no-op, and it was shadowing jsdom's working implementation in Vitest — meaning any test touching `localStorage` (including zustand's `persist` middleware, used for the first time in this phase) failed. Fixed generically in `src/test/setup.ts` with a small in-memory `Storage` polyfill stubbed over `globalThis.localStorage`, rather than avoiding persistence testing — this unblocks Phase 9's cart/checkout stores too.
- Lighthouse accessibility score ≥ 90 acceptance criterion is unverified — flagged as open in Acceptance Criteria above rather than silently marked done.
