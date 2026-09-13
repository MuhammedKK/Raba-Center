# Amal Care — Frontend Platform Plan

## 1. Project Overview

**Amal Care** (مركز أمل — "Amal" = Hope) is a bilingual (Arabic RTL / English LTR) marketing + demo platform for a pediatric ABA (Applied Behavior Analysis) / child-development therapy center. It is being built speculatively as a polished, modern pitch deliverable for a client in the medical/therapeutic services space.

**Reference used for feature/content scope**: `raba-center.com` (a real competitor) — researched purely for its page inventory, navigation structure, and section content. None of its branding, images, icons, or colors are reused; this project uses original visual identity throughout.

**Scope decision**: This is a **frontend-only demo** (Vite SPA, no real backend). Every flow — including login, cart, favorites, and checkout — is built against a swappable API-client abstraction backed by mock data (MSW), so a real backend can be wired in later with zero component refactors. Payment/checkout is explicitly mocked and labeled as a demo, not a production payment flow.

**Language**: Arabic (RTL, primary) + English (LTR), fully bilingual with path-prefixed locale routing (`/ar/...`, `/en/...`).

## 2. Tech Stack

| Concern                     | Choice                                                                                                                                                                           |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Build tool                  | Vite 6                                                                                                                                                                           |
| UI library                  | React 19 + TypeScript 5 (strict)                                                                                                                                                 |
| Styling                     | Tailwind CSS v4 (CSS-first `@theme`, logical properties for RTL)                                                                                                                 |
| Routing                     | React Router v7                                                                                                                                                                  |
| Animation                   | Framer Motion (`motion/react`)                                                                                                                                                   |
| Forms/validation            | React Hook Form + Zod (`@hookform/resolvers/zod`)                                                                                                                                |
| i18n                        | react-i18next + i18next, path-prefixed `/ar` `/en` locale routing                                                                                                                |
| State (cart/favorites/auth) | Zustand (+ `persist` middleware)                                                                                                                                                 |
| Icons                       | lucide-react                                                                                                                                                                     |
| Fonts                       | Self-hosted variable fonts: **Sora** (Latin headings), **Inter** (Latin body), **IBM Plex Sans Arabic** (Arabic headings + body)                                                 |
| Images                      | `vite-imagetools` (responsive AVIF/WebP at build time) + `vite-plugin-image-optimizer`                                                                                           |
| Mock API                    | MSW (Mock Service Worker) — intercepts real `fetch` calls so components/hooks never know they're talking to a mock                                                               |
| Linting/format              | ESLint 9 flat config + typescript-eslint + eslint-plugin-react-hooks + eslint-plugin-jsx-a11y + import ordering + `prettier-plugin-tailwindcss` + Prettier + Husky + lint-staged |
| Unit/component tests        | Vitest + React Testing Library + jest-dom + user-event                                                                                                                           |
| E2E tests                   | Playwright (parametrized over `ar`/`en` locales)                                                                                                                                 |

## 3. Architecture Principles

1. **API boundary**: all data access goes through `src/api/`, never direct MSW/fetch calls from components or hooks.
2. **Feature isolation**: all domain logic is isolated under `src/features/<domain>/`; cross-feature reuse only through `src/shared/`.
3. **i18n-only strings**: zero hardcoded UI strings — everything goes through translation keys in both `ar` and `en`.
4. **RTL via logical properties**: use Tailwind logical utilities (`ps-*`, `pe-*`, `text-start`, `border-s`) everywhere instead of physical ones (`pl-*`, `pr-*`, `text-left`) so layouts auto-flip for RTL without parallel override blocks.

## 4. i18n Routing Decision

**Path-prefixed locale routing** (`/ar/courses`, `/en/courses`), with `/` redirecting to the default locale (`ar`). This gives every page a crawlable, shareable, `hreflang`-correct URL — important for the SEO story in a client pitch — and is the standard pairing for react-i18next + React Router projects.

## 5. Folder Structure

```
src/
  app/{router,providers,config}/       # route tree, route paths, providers, typed env
  pages/                               # thin route-level components (HomePage, CourseDetailPage, ...)
  features/                            # one folder per domain: home, about, services, courses,
                                        # trainers, branches, blog, contact, cart, favorites, auth
                                        # each: components/, hooks/, <domain>.types.ts
  shared/
    components/ui/                     # design-system primitives: Button, Card, Input, Modal, ...
    components/composed/               # cross-feature composites: SectionHeading, PriceTag, ...
    layouts/                           # MainLayout, AccountLayout, Header, Footer, LanguageSwitcher
    hooks/                             # useMediaQuery, useDebounce, useLocalStorage, useDirection
    utils/                             # formatCurrency, formatDate, slugify, cn()
  api/                                 # swappable HTTP client: client.ts + endpoints/*.api.ts
  mocks/                               # MSW browser.ts + server.ts + handlers/ + data/ (seed fixtures)
  i18n/                                # i18next config + locales/ar/*.json + locales/en/*.json
  types/                               # global shared TS types (ApiResponse<T>, Locale, Direction)
  assets/{images,icons,fonts}/         # organized by category
  styles/                              # Tailwind entry + design-token CSS custom properties
  test/                                # Vitest setup, test-utils render wrapper, data factories
e2e/                                   # Playwright specs + fixtures
```

Dependency direction is one-way: `pages → features → shared`, never the reverse.

## 6. Naming Conventions

| What        | Convention                                                                                                       | Example                                           |
| ----------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Components  | `PascalCase.tsx`, named exports only (except `pages/*Page.tsx`, which may default-export for route lazy-loading) | `CourseCard.tsx` → `export function CourseCard()` |
| Hooks       | `useCamelCase.ts`                                                                                                | `useCourseFilters.ts`                             |
| Pages       | `PascalCase` + `Page` suffix                                                                                     | `CourseDetailPage.tsx`                            |
| Utils       | `camelCase.ts`, verb-first, grouped by concern                                                                   | `formatCurrency.ts`                               |
| Types       | `camelCase.types.ts`, `PascalCase` interfaces                                                                    | `courses.types.ts` → `interface Course`           |
| Zod schemas | `camelCase.schema.ts`, `Schema` suffix                                                                           | `contactFormSchema`                               |
| Constants   | `SCREAMING_SNAKE_CASE` values, `camelCase.constants.ts` files                                                    | —                                                 |
| Tests       | Colocated `*.test.tsx` next to source; Playwright specs in `e2e/flows/*.spec.ts` named by journey                | `CourseCard.test.tsx`                             |
| Barrels     | One `index.ts` per feature's `components/` folder, public exports only                                           | —                                                 |
| Path alias  | `@/` → `src/` for all cross-folder imports                                                                       | `@/shared/components/ui`                          |

CSS/Tailwind class order is enforced automatically by `prettier-plugin-tailwindcss` — never hand-ordered.

## 7. Design Tokens

### Colors

Warm teal primary (calm, trustworthy, not clinical-cold) + amber/coral accents (warmth, child-centered) + warm neutrals:

| Token           | Hex       | Usage                                            |
| --------------- | --------- | ------------------------------------------------ |
| `primary-500`   | `#0F8B8D` | Brand teal — nav accents, primary buttons, links |
| `primary-700`   | `#0B6668` | Hover states, headings on light bg               |
| `primary-100`   | `#DCF2F1` | Section backgrounds, badges                      |
| `secondary-500` | `#2E5077` | Footer, secondary emphasis                       |
| `accent-500`    | `#F4A259` | CTA highlight, featured badges, rating stars     |
| `accent-100`    | `#FDEBD6` | Offer card backgrounds                           |
| `hope-500`      | `#F2766B` | Illustration/icon accent (ties to "Amal/Hope")   |
| `neutral-900`   | `#1F2937` | Headings                                         |
| `neutral-700`   | `#4B5563` | Body text                                        |
| `neutral-400`   | `#9CA3AF` | Muted text, placeholders                         |
| `neutral-200`   | `#E5E7EB` | Borders, dividers                                |
| `neutral-50`    | `#F9FAFB` | Page background                                  |
| `success-500`   | `#22A06B` | Success states                                   |
| `warning-500`   | `#E9A23B` | Warning states                                   |
| `danger-500`    | `#E4574C` | Error/validation                                 |
| `info-500`      | `#3B82C4` | Informational banners                            |

### Typography

- **Headings**: Sora (Latin) / IBM Plex Sans Arabic (Arabic)
- **Body**: Inter (Latin) / IBM Plex Sans Arabic (Arabic)
- Self-hosted via `@fontsource*`, `system-ui` fallback stack, no external font requests.

## 8. Phased Delivery Roadmap

| #   | Phase                                          | Status      | Folder                                                                         |
| --- | ---------------------------------------------- | ----------- | ------------------------------------------------------------------------------ |
| 0   | Foundation & Tooling                           | Done        | [phases/00-foundation](phases/00-foundation/README.md)                         |
| 1   | Design System & Global Layout                  | Done        | [phases/01-design-system-layout](phases/01-design-system-layout/README.md)     |
| 2   | Home Page                                      | Done        | [phases/02-home-page](phases/02-home-page/README.md)                           |
| 3   | About Us                                       | Not Started | [phases/03-about-us](phases/03-about-us/README.md)                             |
| 4   | Services                                       | Not Started | [phases/04-services](phases/04-services/README.md)                             |
| 5   | Courses & Programs + Trainers                  | Not Started | [phases/05-courses-trainers](phases/05-courses-trainers/README.md)             |
| 6   | Branches Locator                               | Not Started | [phases/06-branches](phases/06-branches/README.md)                             |
| 7   | Blog                                           | Not Started | [phases/07-blog](phases/07-blog/README.md)                                     |
| 8   | Contact & Lead-Gen Forms                       | Not Started | [phases/08-contact-forms](phases/08-contact-forms/README.md)                   |
| 9   | Account Layer (Auth, Favorites, Cart/Checkout) | Not Started | [phases/09-account-layer](phases/09-account-layer/README.md)                   |
| 10  | Motion, SEO & Performance Polish               | Not Started | [phases/10-motion-seo-performance](phases/10-motion-seo-performance/README.md) |
| 11  | Accessibility Pass                             | Not Started | [phases/11-accessibility](phases/11-accessibility/README.md)                   |
| 12  | QA: Unit + E2E Test Suite                      | Not Started | [phases/12-qa-testing](phases/12-qa-testing/README.md)                         |

## 9. Open Decisions / Assumptions Log

- Real payment integration is out of scope — checkout is a mocked, clearly-labeled demo flow.
- No CMS — blog/course/trainer content is static mock data (`src/mocks/data/`).
- No multi-currency support — pricing shown in SAR only, matching the reference market.
- No real geolocation for "nearest branch" — branch list is static, grouped by city.
- Services page ships as a single page with anchor sections for v1 (not one detail page per service) to control scope; revisit in Phase 10 polish if time allows.
- Phase 2 pulled two things forward from later phases because they were cheap and immediately valuable: a minimal `features/courses` slice (`courses.types.ts`, `useCourses`, `CourseCard`) for the home page's featured-courses section — Phase 5 extends this with filters/detail pages rather than rebuilding it — and a site-wide `PageTransition` wrapper (originally scoped to Phase 10) wired into `MainLayout`, since every page benefits from it immediately rather than waiting for the dedicated polish pass.
- The MSW mock layer must stay active in the **production** build, not just dev (`env.useMocks`, checked in `main.tsx`) — this is a frontend-only demo with no real backend, so disabling mocks in prod (the initial, incorrect assumption) silently breaks every data-driven page. See `phases/02-home-page` Notes for the full incident.

## 10. Glossary (bilingual term consistency)

| English                   | Arabic                        |
| ------------------------- | ----------------------------- |
| ABA therapy               | العلاج بتحليل السلوك التطبيقي |
| Applied Behavior Analysis | تحليل السلوك التطبيقي         |
| Speech & Language Therapy | علاج النطق واللغة             |
| Assessment & Diagnosis    | التقييم والتشخيص              |
| Home Services             | الخدمات المنزلية              |
| Shadow Teacher            | معلم ظل (سِوار)               |
| Branches                  | الفروع                        |
| Trainers / Specialists    | المدربون / الأخصائيون         |
| Enroll                    | التسجيل                       |
| Favorites                 | المفضلة                       |
| Cart                      | السلة                         |
| Checkout                  | إتمام الطلب                   |
