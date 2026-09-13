# Phase 11: Accessibility Pass

## Status

Not Started

## Business

A medical/therapy service site has a materially higher-than-average accessibility expectation — parents of children with developmental disabilities are a plausible audience with their own accessibility needs. Lint coverage alone (`jsx-a11y`) doesn't catch runtime issues like focus order, ARIA live regions, or RTL-specific focus-trap bugs.

## User Story

As a visitor using a keyboard or screen reader, I want to navigate and use every part of the site — forms, modals, carousels, language switching — without barriers, so that I can access the same information and services as any other visitor.

## Acceptance Criteria

- [ ] Full keyboard navigation works across all interactive components (modals, carousels, drawers, forms)
- [ ] All text/background color combinations from the design tokens meet WCAG AA contrast
- [ ] Toast notifications and form validation errors use `aria-live` regions
- [ ] Screen-reader spot checks pass on key flows (form submission, cart, language switch) in both `ar` and `en`
- [ ] Focus traps in modals and the mobile nav drawer work correctly in both RTL and LTR

## Expected Outcomes

A site that passes both automated and manual accessibility checks on its critical flows, with any palette adjustments needed for contrast made before final client presentation.

## Task Checklist

- [ ] Keyboard-navigation audit across all interactive components
- [ ] Automated contrast audit of the full token palette (`PLAN.md` §7); adjust hex values if any pairing fails AA
- [ ] Add `aria-live` regions to `Toast` and form error components
- [ ] Manual screen-reader spot check (VoiceOver/NVDA) on key flows, both locales
- [ ] RTL-specific focus-trap verification on `Modal` and `MobileNavDrawer`
- [ ] Document any accessibility scope caveats (e.g., limited native-Arabic screen-reader validation)

## Notes / Risks

- RTL + focus-trap combinations are the most common place accessibility bugs hide, since most component libraries are tested LTR-only.
- Arabic screen-reader pronunciation/announcement quality can't be fully validated without a native Arabic speaker — flag this as an explicit scope caveat rather than silently under-delivering.
- Any color-contrast fixes discovered here may require palette hex adjustments in `PLAN.md` §7 — resolve before the final client presentation.
