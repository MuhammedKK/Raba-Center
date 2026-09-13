# Phase 2: Home Page

## Status

Done

## Business

The home page is the single highest-impact page for a "sellable" pitch — it needs to demonstrate the full visual and motion language of the platform in one scroll, and is the page most likely to determine whether a prospective client keeps browsing.

## User Story

As a visitor landing on the site for the first time, I want to immediately understand what Amal Care offers, see proof of credibility (certifications, stats, testimonials), and find a clear next step, so that I feel confident exploring further or reaching out.

## Acceptance Criteria

- [x] Hero section renders with a clear value proposition and primary CTA
- [x] Certification/credential logo strip renders (infinite marquee, pause-on-hover, reduced-motion fallback to a static wrapped row)
- [x] Stats counters animate on scroll into view and respect `prefers-reduced-motion` — verified in `e2e/flows/home.spec.ts`
- [x] Promotional offer cards render from mock data (with a pointer-tilt 3D hover effect)
- [x] Featured courses section renders course cards (rating, price, duration) via `useCourses` (built as a reusable `features/courses` hook/component, pulled forward from Phase 5)
- [x] Testimonials carousel renders and swipes in the correct direction for both RTL and LTR — verified in `e2e/flows/home.spec.ts` via real drag simulation in both locales
- [x] Accreditation logos section renders (a separate static-grid section, distinct from the marquee strip, per the reference site's two accreditation sections)
- [x] All content and copy render correctly in both `ar` and `en`
- [x] Page passes a manual performance/visual smoke check — screenshotted in both locales at three scroll depths via a throwaway Playwright script; no obvious layout shift or broken sections (Lighthouse itself is deferred to Phase 10 per `PLAN.md`)

## Expected Outcomes

A fully animated, content-complete home page that pulls from the mock API layer (stats, offers, courses, testimonials) through a clean `useHomeData`-style composition pattern, demoable as the opening page of a client walkthrough.

## Task Checklist

- [x] `HeroSection` (layered animated gradient orbs, staggered reveal, magnetic CTA, scroll cue), `AccreditationStrip` (CSS-keyframe marquee)
- [x] `AnimatedStatsCounter` (Framer Motion `animate()` + `useInView` via `useScrollReveal`, reduced-motion aware) — logic extracted into a testable `useCountUp` hook
- [x] `OffersCarousel` (native snap-scroll, 3D pointer-tilt `OfferCard`), `FeaturedCourses` (reuses `CourseCard` from `features/courses`)
- [x] `TestimonialsCarousel` (RTL-aware drag direction, autoplay with pause-on-hover, dot pagination, `AnimatePresence` slide transitions)
- [x] `useHomeData` hook aggregating stats/offers/courses/testimonials/credentials/accreditations via `Promise.all` over the `api/endpoints/*` layer
- [x] Home page i18n keys (`home.json`, both locales) + `courses.json` (both locales, including full Arabic plural forms for course duration)
- [x] Unit tests for `AnimatedStatsCounter` trigger/reset logic — via `useCountUp.test.ts` (inactive/active/reset/re-trigger/no-re-animate cases) plus a component-level render test
- [x] Site-wide `PageTransition` wrapper (fade/slide on route change) wired into `MainLayout` — pulled forward from Phase 10 since it was cheap and elevates every page immediately
- [x] Reusable motion primitives added to `shared/components/composed/`: `AnimatedSection`, `SectionHeading`, `Marquee`, `CredentialBadge`, `PageTransition` — for reuse by every later content phase

## Notes / Risks

- Carousels built LTR-first often swipe backwards once `dir="rtl"` is applied — test explicitly, don't assume Framer Motion/library defaults handle it. **Confirmed via `e2e/flows/home.spec.ts`**: the fix is a single `effectiveOffset = isRtl ? -info.offset.x : info.offset.x` flip on the drag-end handler, plus mirroring the slide-in/out `x` offsets by the same sign — get this pattern right once here since Phase 5 (course galleries) and any other future carousel will copy it.
- This page aggregates 6 mock endpoints (stats, offers, featured courses, testimonials, credentials, accreditations) — the `useHomeData` composition pattern (`Promise.all` over `api/endpoints/*`, one `isLoading` flag) established here will be copied by later data-heavy pages.
- **Found via manual screenshot verification, not caught by any automated check**: `main.tsx` only started the MSW mock worker when `!import.meta.env.PROD`, so the production build (`vite build` + `vite preview`) made real `fetch` calls to a nonexistent backend — every data-driven section on the page silently rendered nothing (`if (data.length === 0) return null`), leaving only the hero visible. Since this project is explicitly a frontend-only demo with no real backend (`PLAN.md` §1), the mock layer has to stay active in production too, not just dev. Fixed by gating on the existing `env.useMocks` config flag instead of `import.meta.env.PROD` — a real deploy of this demo would otherwise have looked broken. **Always sanity-check a production build (`npm run build && npm run preview`), not just `npm run dev`, when a page depends on the mock API layer.**
- **Found while writing the drag E2E test**: Playwright's global `reducedMotion: 'reduce'` context setting (added in `playwright.config.ts` to keep animation-based assertions deterministic) also makes `window.matchMedia('(prefers-reduced-motion: reduce)')` report `true` in every E2E test, which meant `TestimonialsCarousel`'s `drag={prefersReducedMotion ? false : 'x'}` disabled dragging entirely under test — and, more importantly, would do the same for any real visitor with that OS preference set. Dragging/swiping is a user-initiated interaction, not automatic motion, so gating it behind reduced-motion was a real UX bug, not just a test inconvenience. Fixed by always enabling `drag="x"` and only simplifying the _automatic_ slide transition (and disabling autoplay) under reduced motion. General lesson for later phases: prefers-reduced-motion should gate animations that happen _to_ the user, not interactions initiated _by_ the user.
