# Phase 2 Follow-Up: Home Page Visual Polish & Rebrand

## Status

Done — Indigo Pulse palette, real photography, offers-alignment bug fix, and carousel polish shipped and verified by the user.

## Business

The first pass of the home page (Phase 2) proved the motion system and data plumbing work end-to-end, but a design review surfaced three problems that matter for a page whose entire job is to make a client say "yes, build the rest of this": a real layout bug in the offers section, placeholder visuals (colored blocks with a single letter) standing in for content that should look real, and a primary color that — after checking competitors — turns out to be the least differentiated choice available in this exact market.

## What prompted this follow-up

1. **A real bug**: the "Limited-time offers" section's cards don't align with the section heading above them on wide screens.
2. **Placeholder fatigue**: `OfferCard` and `CourseCard` use flat gradient blocks with a single letter instead of imagery, and the testimonials carousel has no faces — it reads as a wireframe, not a pitch-ready page.
3. **Color research**: I re-checked `raba-center.com` and two other real ABA/autism-therapy sites (Action Behavior Centers, Caliber Autism). All three lean **green or teal** — exactly the family our current `primary-500 #0F8B8D` sits in. To look distinct and "catchy" rather than blending into the category, the brand needs to move to a different hue family.

## Bug Diagnosis: Offers Section Misalignment

`OffersCarousel` wraps `SectionHeading` in `mx-auto max-w-6xl px-4 sm:px-6` (so the heading is centered and capped at 1152px), but the horizontal scroll row of cards underneath is a **separate** element with only `px-4 sm:px-6` — no `mx-auto max-w-6xl`. On any screen wider than ~1200px, the heading sits centered while the card row starts flush from the actual viewport edge, so the first card's left edge (in LTR) no longer lines up under the heading's left edge. A `shrink-0 basis-0` spacer div was added to fake a leading gutter but it doesn't track the heading's actual max-width, so the two drift apart as the screen gets wider — this is the "not consistent" alignment bug.

**Fix**: give the scroll container the same `mx-auto max-w-6xl` constraint as the heading, and achieve the "peek at the next card" bleed effect with `scroll-padding-inline` + negative edge margins _inside_ that constrained container instead of letting the whole row run full-bleed. This keeps the left edge locked to the heading at every breakpoint while still allowing the last card to visually peek past the right edge on request.

## Design Research Summary

| Site                        | Primary color family                              | Imagery                                                              | Takeaway                                                                                      |
| --------------------------- | ------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| raba-center.com (reference) | Teal/dark navy + gold accreditation badges        | Real therapy-room photos, circular parent avatars, course thumbnails | Confirms real photography (not flat color blocks) is the category norm                        |
| Action Behavior Centers     | Bright green + navy text                          | Authentic, candid photos of children in therapy, warm natural light  | "Clinical yet hopeful" — green reads as "growth," but it's the most common choice in-category |
| Caliber Autism              | Blue/green + warm accents, decorative shape icons | Real therapist-with-child photos + custom service icons              | Blends photography and icons; playful decorative shapes add personality                       |

**Conclusion**: real, warm photography is table-stakes in this category — our flat gradient placeholders read as unfinished by comparison. And since every direct competitor checked sits in green/teal, that's the one hue family we should actively avoid if the goal is to look premium and distinct rather than "another therapy-center teal site."

## Approved Palette: "Indigo Pulse"

`primary-500 #5B5FEF` → `#8B5CF6` gradient (indigo → violet). Reads as modern health-tech/SaaS (premium, high-contrast, calm-but-energetic), and is the furthest from every competitor's green/teal.

| Token                                            | Old (teal) | New (Indigo Pulse)                            |
| ------------------------------------------------ | ---------- | --------------------------------------------- |
| `primary-50`                                     | `#eafafa`  | `#EEEEFE`                                     |
| `primary-100`                                    | `#dcf2f1`  | `#E0E1FC`                                     |
| `primary-500`                                    | `#0f8b8d`  | `#5B5FEF`                                     |
| `primary-600`                                    | `#0d797b`  | `#4C4FE0`                                     |
| `primary-700`                                    | `#0b6668`  | `#4338CA`                                     |
| `secondary-500`                                  | `#2e5077`  | `#3B3178` (deep indigo-violet, replaces navy) |
| `secondary-700`                                  | `#1f3654`  | `#281F52`                                     |
| Gradient (hero blobs, offer scrims, CTA accents) | teal-based | `#5B5FEF → #8B5CF6`                           |

Accent (`accent-500 #F4A259`) and hope-coral (`hope-500 #F2766B`) stay unchanged — they weren't part of the green/teal problem and pair well with indigo/violet.

## Approved: Testimonial Avatars

Illustrated/initials-based avatars (matching `CredentialBadge`'s visual language) — no real stock photos attached to the invented testimonial names/quotes.

## Imagery Plan

Replace flat placeholders with real, warm, license-free photography (Pexels/Unsplash, free commercial use, no attribution required), self-hosted through the existing `vite-imagetools` pipeline (downloaded into `src/assets/images/`, not hotlinked):

- **Hero**: add a real photo (a specialist warmly engaged with a child, or a parent and child together) as a second column on desktop — the current hero is centered text-only, which is a real contributor to the "too simple" feeling. Stacks below the text on mobile.
- **Offer cards** (3): a background photo per offer (ABA session, in-home therapy setting, specialist training/notebook) with a gradient scrim in the new primary color overlaid so text/badge stay legible — replaces the flat color block.
- **Course cards** (4): a representative thumbnail per program (therapy session, supervision meeting, data/notes close-up, speech exercise) instead of a single-letter gradient block.

**One caution I want to flag rather than just do quietly**: the testimonials currently have invented names ("Sara A.", "Faisal M.") with invented quotes. Attaching _real stock photos of real people_ to those invented names would effectively fabricate an identity for a photographed stranger who never said that quote — that's a step beyond "placeholder imagery" and into something I'd rather not do without you explicitly signing off on it. My recommendation: give testimonials **generated/illustrated avatars** (initials-based or an abstract avatar style, similar to what `CredentialBadge` already does) rather than real human photos. Real photography stays fine everywhere else (hero, offers, courses) since nothing there is attributed to a specific fake named individual.

## User Story

As the person pitching this site to a client, I want the home page to look like a finished, photographed product with a distinct brand color — not a wireframe with colored placeholder blocks — so that the demo reads as premium and ready to sell, not as a work-in-progress.

## Acceptance Criteria

- [x] Offers section cards align with the section heading's left/start edge at every breakpoint (bug fixed, verified at 1440px+ specifically, where it currently breaks)
- [x] Approved primary color direction is applied consistently across every token, gradient, and component that currently references teal (`primary-*`, hero blobs, buttons, stats numbers, section-heading underline default state, marquee hover, etc.)
- [x] Hero includes real photography, not just text and abstract shapes
- [x] `OfferCard` shows a real background photo with a legible gradient scrim, not a flat color block
- [x] `CourseCard` shows a real representative thumbnail, not a single-letter gradient block
- [x] Testimonials get illustrated/generated avatars (not real stock photos misattributed to invented names)
- [x] All new images are self-hosted (downloaded into `src/assets/images/`) and run through the existing responsive-image pipeline, not hotlinked from a third-party CDN
- [x] Page still passes `npm run verify` (lint/typecheck/unit/build) and renders correctly in both `ar` (RTL) and `en` (LTR) after the rebrand

## Expected Outcomes

A home page that no longer reads as a wireframe: a distinct, premium brand color that doesn't blend into the green/teal norm of this exact market, real photography wherever content is being shown, a fixed and consistent offers-section layout, and testimonials that feel honest (illustrated avatars) rather than borrowing strangers' faces for invented quotes.

## Task Checklist

- [x] Fix `OffersCarousel` container/heading alignment (root-cause fix described above)
- [x] Apply the approved palette to `src/styles/index.css` `@theme` tokens and every component currently hardcoding `primary-*`/teal gradients
- [x] Source and download 1 hero photo, 3 offer photos, 4 course thumbnails (Pexels/Unsplash, free-license) into `src/assets/images/`
- [x] Rebuild `HeroSection` as a two-column layout on desktop (text + photo), single-column stacked on mobile
- [x] Rebuild `OfferCard` with photo background + gradient scrim in the new primary color
- [x] Rebuild `CourseCard`'s `Card.Media` to show the sourced thumbnail instead of a letter-on-gradient block
- [x] Add illustrated/initials-based avatars to `TestimonialsCarousel`
- [x] Fix discount badge clipping and low-contrast title text on `OfferCard` (badge was half-clipped by `overflow-hidden`; card titles inherited the global `h1-h6 { text-neutral-900 }` base style instead of white, making them unreadable over photos)
- [x] Add designed, RTL-aware previous/next arrow controls to `TestimonialsCarousel` (logical start/end positioning, icons mirror direction)
- [x] Re-run `npm run typecheck`, `npm run lint`, and `npm run build`; final visual verification done manually by the user in-browser, not via automated screenshots

## Notes / Risks

- Changing `primary-*` tokens touches nearly every component built in Phases 0–2 (buttons, nav active states, focus rings, stats, badges) — this needs a full visual re-check in both locales, not just a token swap, since some combinations (e.g., focus-ring opacity, hover states) were tuned against the old teal's specific lightness/saturation.
- Real photography adds real download weight — will keep an eye on the existing "chunk > 500kB" build warning and lean on `vite-imagetools`' responsive/AVIF output rather than shipping full-resolution originals.
- The testimonial-avatar caution above is a judgment call, not a hard rule — flagging it for your decision rather than silently picking one path.
- `vite-plugin-image-optimizer` skips re-encoding all sourced JPEGs (hero, offers, courses) because its default re-encode settings produce a _larger_ file than the already-compressed Pexels source (+121% to +206%), so it correctly falls back to the original. This is a real, deferred gap: full responsive-image/AVIF output and a Lighthouse pass are already scoped to Phase 10 in the root plan — no action needed now, just flagging so Phase 10 doesn't rediscover it from scratch.
