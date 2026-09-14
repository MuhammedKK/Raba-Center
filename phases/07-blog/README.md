# Phase 7: Blog

## Status

Done — blog list with category filter, detail page with a structured block-content renderer (heading/paragraph/image/quote) and related posts, 4 seed articles, shipped in both locales. Lighthouse image-performance check not run this session (see Notes).

## Business

Blog/content marketing demonstrates SEO-readiness and ongoing value to a pitch audience. It's a comparatively low-risk, high-completeness-signal phase, best built after the harder e-commerce-like Courses phase once patterns are established.

## User Story

As a parent researching child development topics, I want to read articles from the center about early intervention and therapy, so that I can learn more and build trust in their expertise before reaching out.

## Acceptance Criteria

- [x] Blog list page renders `BlogCard`s (image, title, excerpt, read time, date, view count) from mock data
- [x] Category filter works on the list page (`BlogFilterBar`, client-side, same pattern as Phase 6's `CityFilterTabs`)
- [x] Blog detail page renders full article body via a structured block-content renderer (heading/paragraph/image/quote blocks)
- [x] Related posts render on the detail page (`getRelatedPosts` — most recent other posts, since each seed category currently maps to exactly one article)
- [x] All content renders correctly in both `ar` and `en`

## Expected Outcomes

A complete blog section with a handful of seed articles, demonstrating both content-marketing readiness and a validated image-heavy performance pipeline (via the Phase 0 `vite-imagetools` setup).

## Task Checklist

- [x] `blog.api.ts` + MSW handler + seed articles (structured block-content JSON keyed to i18n strings, not raw HTML/markdown — 4 articles: early intervention, speech milestones, sensory play, family reading)
- [x] `BlogCard`, `BlogFilterBar`, `ReadTimeBadge` components
- [x] Block-content renderer (`BlogBlockRenderer` — heading/paragraph/image/quote block types)
- [x] `BlogListPage`, `BlogDetailPage` routes
- [x] `useBlogPosts`, `useBlogPost` hooks
- [x] Blog i18n keys (`blog.json`, both locales)
- [ ] Lighthouse image-performance check on the blog list page — not run this session (no browser automation used per standing instruction to keep verification manual); recommend a real Lighthouse pass before Phase 10

## Notes / Risks

- Reading time and view count are mock/static — non-live data, not real analytics. `viewCount` is locale-formatted via `Intl.NumberFormat` (matching the `formatCurrency`/`formatDate` pattern) rather than a plain `toLocaleString()` default, so digit grouping is correct per locale.
- This phase is image-heavy (4 unique sourced photos, each used as both a card thumbnail and inline in its article body) and is a good candidate for the Phase 10 responsive-image/Lighthouse audit — no Lighthouse run was performed this session; flagged rather than assumed passing.
- Block-content renderer uses `index` as the React key for blocks — acceptable since `body` arrays are static seed data with a stable order, never reordered/mutated at runtime.
- Related posts are computed client-side (`getRelatedPosts`, most-recent-other-posts) rather than by shared category, because each of the 4 seed categories currently has exactly one article — a same-category match would always be empty. If more articles are added per category later, prefer same-category matches first and fall back to most-recent otherwise.
