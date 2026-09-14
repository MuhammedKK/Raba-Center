# Phase 9: Account Layer (Mock Auth, Favorites, Cart/Checkout)

## Status

Done — mock email/password login against one seeded user, `useCartStore` (Zustand persist), a real Cart/Checkout flow with a visible Demo Mode badge, and `AuthGuard` protecting Cart/Checkout (not Favorites — see Notes for why). Closes the Phase 5 browse → favorite → enroll → cart → checkout loop end to end.

## Business

This phase demonstrates the platform can support real e-commerce/account functionality — a key differentiator from a pure brochure site. It's where the pitch shows "this isn't just a marketing site, it's a platform" the client could actually operate.

## User Story

As a returning visitor, I want to log in, see the courses I've favorited, manage my cart, and complete a checkout, so that I can actually enroll my child in a program through the site.

## Acceptance Criteria

- [x] `LoginPage` validates against one seeded mock user record (clearly documented as non-production — `mocks/data/users.data.ts`, and the demo credentials are shown directly on the login screen)
- [x] `useAuthStore` persists mock session across reload via `localStorage` (Zustand `persist`)
- [x] `FavoritesPage` lists saved courses from `useFavoritesStore` (built in Phase 5, unchanged here)
- [x] `CartPage` supports line items, quantity change, and removal
- [x] `CheckoutPage` collects address/payment-look-alike info and ends in a mock "order confirmed" state, visibly labeled as a demo (no real payment processing)
- [x] `AuthGuard` correctly protects Cart/Checkout routes — **not** Favorites; this deliberately deviates from the criterion as originally written (see Notes)
- [x] A course favorited/added to cart while logged out is still present after logging in — verified by unit test
- [x] All content renders correctly in both `ar` and `en`

## Expected Outcomes

A working mock account layer — login, favorites, cart, and a clearly-labeled demo checkout — that closes the loop on the Phase 5 "browse → favorite → enroll" journey, demonstrable start to finish in a client walkthrough.

## Task Checklist

- [x] `auth.api.ts` + `cart.api.ts` + MSW handlers + one seeded user
- [x] `useAuthStore`, `useCartStore` (Zustand + persist)
- [x] Login form (inline in `LoginPage`, RHF + Zod), `AuthGuard` component
- [x] `LoginPage`, `FavoritesPage`, `CartPage`, `CheckoutPage` routes (Favorites/Cart already existed from Phase 5; Cart/Checkout are new real implementations replacing the Phase-9 placeholders)
- [x] Pre-login → post-login cart/favorites "merge" — turned out to need no actual merge logic (see Notes)
- [x] Visible "Demo Mode" `Badge` on the checkout flow, plus an explicit no-real-payment notice
- [x] Account layer i18n keys (`account.json`, both locales) — extended with `login.*`, `cart.*`, `checkout.*`
- [x] Unit tests for auth store (`useAuthStore.test.ts`, 6 cases incl. real login against MSW), cart store (`useCartStore.test.ts`, 7 cases), and the merge-on-login logic (covered in the same auth store test file), plus a checkout-schema validation test (5 cases)

## Notes / Risks

- **Resolved a real conflict between this phase's spec and Phase 5's shipped, tested acceptance criterion.** Phase 5 explicitly required "Add to favorites persists across reload (**allowed while unauthenticated**)" and shipped/tested exactly that. This phase's own criterion — "`AuthGuard` correctly protects Favorites/Cart/Checkout routes" — contradicts it if taken literally. Resolution: `AuthGuard` wraps only Cart and Checkout in `routes.tsx`; the Favorites route stays open, matching Phase 5's already-demoed behavior. The distinction that makes this coherent rather than arbitrary: Favorites is a save-for-later action with no transactional/identity requirement, while Cart→Checkout is the actual purchase flow, which legitimately needs to know who's buying. Flagging this explicitly rather than silently picking a side.
- Must be unambiguous in the UI that checkout is fully mocked — a visible "Demo Mode" `Badge` plus an explicit notice line ("no real payment is processed and no card details are stored") sits directly above the checkout form.
- Session persistence via `localStorage` survives refresh but not across browsers/devices — acceptable for a demo.
- **The "merge-on-login" requirement turned out to need no actual merge logic.** `useFavoritesStore` and `useCartStore` are single global `persist`-backed stores, not scoped per-user-id (there's only one seeded user in this demo, so per-user scoping would be pure overhead). `login()`/`logout()` only ever touch `isAuthenticated`/`user` — they never read or reset `items`/`ids`. That makes "state added while signed out survives login" true by construction, not by a merge step; a unit test in `useAuthStore.test.ts` proves it rather than assumes it. If a future phase adds multiple real user accounts, this assumption breaks and per-user-scoped storage keys would be needed.
- `CourseDetailPage`'s "Enroll" button behavior changed from Phase 5's placeholder (which just showed an "enrolled" toast) to actually calling `useCartStore.addItem()` — enrolling now means "add to cart, then complete checkout," which is what actually makes the Cart/Checkout flow reachable from the course catalog. Toast copy updated to match ("Added to your cart — complete checkout to finish enrolling").
- Added a cart item-count badge and a logout affordance to the global `Header` (Phase 1) — not explicitly scoped in the task checklist, but the account layer was otherwise unreachable/unobservable from the persistent nav (no way to see cart had items, no way to log out). Small, directly load-bearing addition, not scope creep.
- Zod's `z.coerce.number()` (used for Shadow Teacher's `childAge` in Phase 8) came up again conceptually here — none of the checkout fields needed coercion (card number/expiry/CVC are all validated as strings via regex), so `CheckoutFormValues` didn't need the `Input`/`Output` type split that `ShadowTeacherRequestForm` required.
