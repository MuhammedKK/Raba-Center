# Phase 10: Motion, SEO & Performance Polish Pass

## Status

Not Started

## Business

This phase pushes the demo from "functionally complete" to "looks like a premium agency build" — the actual differentiator in a competitive client pitch. Dedicated polish after all pages exist is more effective than polishing incrementally per phase, since consistent motion/performance patterns are easier to apply once the full page inventory is known.

## User Story

As a prospective client evaluating this platform, I want every page to feel fast, smooth, and professionally finished, so that I perceive the platform as high-quality and worth investing in.

## Acceptance Criteria

- [ ] Route-change page transitions are implemented consistently via Framer Motion `AnimatePresence`
- [ ] Scroll-reveal animation is applied consistently across all sections without causing layout shift (CLS)
- [ ] Every page has correct per-language SEO `<title>`/meta tags and `hreflang` alternates
- [ ] Every image-heavy page has been audited through the `vite-imagetools` responsive pipeline
- [ ] Lighthouse performance/accessibility/best-practices/SEO scores are 90+ on both locales for at least the Home, Courses, and Blog pages
- [ ] Font loading shows no visible FOUT/FOUC
- [ ] Route-based code-splitting (`React.lazy`) is applied per page and bundle size is audited

## Expected Outcomes

A site that feels consistently animated, fast, and search-engine-ready across every page and both languages — the polish pass that makes the demo pitch-ready.

## Task Checklist

- [ ] Implement route-transition animation wrapper
- [ ] Apply scroll-reveal pattern to all major sections (reserve layout space to avoid CLS)
- [ ] Add `react-helmet-async` (or native React 19 head tag support) with per-page bilingual meta + hreflang
- [ ] Full responsive-image audit across Home, About, Courses, Trainers, Branches, Blog
- [ ] Run and record Lighthouse scores for both locales
- [ ] Apply `React.lazy` route-based code-splitting
- [ ] Bundle-size audit and any necessary chunk-splitting adjustments

## Notes / Risks

- `hreflang`/canonical URL strategy depends on the Phase 0 i18n routing decision (already locked in `PLAN.md` §4) — don't re-decide it here.
- Scroll-reveal must not introduce CLS regressions — every animated element needs reserved space before it animates in.
- Route-based code-splitting combined with lazy-loaded data fetching can race — verify loading states don't flash incorrectly.
