# Phase 7: Blog

## Status

Not Started

## Business

Blog/content marketing demonstrates SEO-readiness and ongoing value to a pitch audience. It's a comparatively low-risk, high-completeness-signal phase, best built after the harder e-commerce-like Courses phase once patterns are established.

## User Story

As a parent researching child development topics, I want to read articles from the center about early intervention and therapy, so that I can learn more and build trust in their expertise before reaching out.

## Acceptance Criteria

- [ ] Blog list page renders `BlogCard`s (image, title, excerpt, read time, date, view count) from mock data
- [ ] Category filter works on the list page
- [ ] Blog detail page renders full article body via a structured block-content renderer (heading/paragraph/image/quote blocks)
- [ ] Related posts render on the detail page
- [ ] All content renders correctly in both `ar` and `en`

## Expected Outcomes

A complete blog section with a handful of seed articles, demonstrating both content-marketing readiness and a validated image-heavy performance pipeline (via the Phase 0 `vite-imagetools` setup).

## Task Checklist

- [ ] `blog.api.ts` + MSW handler + seed articles (structured block-content JSON, not raw HTML/markdown)
- [ ] `BlogCard`, `BlogFilterBar`, `ReadTimeBadge` components
- [ ] Block-content renderer (heading/paragraph/image/quote block types)
- [ ] `BlogListPage`, `BlogDetailPage` routes
- [ ] `useBlogPosts`, `useBlogPost` hooks
- [ ] Blog i18n keys (`blog.json`, both locales)
- [ ] Lighthouse image-performance check on the blog list page

## Notes / Risks

- Reading time and view count are mock/static — this must be clearly understood as non-live data, not silently presented as real analytics.
- This phase is the best test of the Phase 0 responsive image pipeline given how image-heavy blog cards are — validate real Lighthouse performance here before the dedicated Phase 10 polish pass.
