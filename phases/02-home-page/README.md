# Phase 2: Home Page

## Status

Not Started

## Business

The home page is the single highest-impact page for a "sellable" pitch — it needs to demonstrate the full visual and motion language of the platform in one scroll, and is the page most likely to determine whether a prospective client keeps browsing.

## User Story

As a visitor landing on the site for the first time, I want to immediately understand what Amal Care offers, see proof of credibility (certifications, stats, testimonials), and find a clear next step, so that I feel confident exploring further or reaching out.

## Acceptance Criteria

- [ ] Hero section renders with a clear value proposition and primary CTA
- [ ] Certification/credential logo strip renders
- [ ] Stats counters animate on scroll into view and respect `prefers-reduced-motion`
- [ ] Promotional offer cards render from mock data
- [ ] Featured courses section renders course cards (rating, price, duration) via `useCourses`
- [ ] Testimonials carousel renders and swipes in the correct direction for both RTL and LTR
- [ ] Accreditation logos section renders
- [ ] All content and copy render correctly in both `ar` and `en`
- [ ] Page passes a Lighthouse performance smoke check (no obvious layout-shift/blocking issues)

## Expected Outcomes

A fully animated, content-complete home page that pulls from the mock API layer (stats, offers, courses, testimonials) through a clean `useHomeData`-style composition pattern, demoable as the opening page of a client walkthrough.

## Task Checklist

- [ ] `HeroSection`, `AccreditationStrip` components
- [ ] `AnimatedStatsCounter` (Framer Motion + `useInView`, reduced-motion aware)
- [ ] `OffersCarousel`, `FeaturedCourses` components
- [ ] `TestimonialsCarousel` (RTL-aware swipe direction)
- [ ] `useHomeData` hook aggregating stats/offers/courses/testimonials from mock endpoints
- [ ] Home page i18n keys (`home.json`, both locales)
- [ ] Unit tests for `AnimatedStatsCounter` trigger/reset logic

## Notes / Risks

- Carousels built LTR-first often swipe backwards once `dir="rtl"` is applied — test explicitly, don't assume Framer Motion/library defaults handle it.
- This page aggregates 4+ mock endpoints — the `useHomeData` composition pattern established here will be copied by later data-heavy pages, so get it clean.
