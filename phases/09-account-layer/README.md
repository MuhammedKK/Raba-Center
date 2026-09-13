# Phase 9: Account Layer (Mock Auth, Favorites, Cart/Checkout)

## Status

Not Started

## Business

This phase demonstrates the platform can support real e-commerce/account functionality — a key differentiator from a pure brochure site. It's where the pitch shows "this isn't just a marketing site, it's a platform" the client could actually operate.

## User Story

As a returning visitor, I want to log in, see the courses I've favorited, manage my cart, and complete a checkout, so that I can actually enroll my child in a program through the site.

## Acceptance Criteria

- [ ] `LoginPage` validates against one seeded mock user record (clearly documented as non-production)
- [ ] `useAuthStore` persists mock session across reload via `localStorage`
- [ ] `FavoritesPage` lists saved courses from `useFavoritesStore`
- [ ] `CartPage` supports line items, quantity change, and removal
- [ ] `CheckoutPage` collects address/payment-look-alike info and ends in a mock "order confirmed" state, visibly labeled as a demo (no real payment processing)
- [ ] `AuthGuard` correctly protects Favorites/Cart/Checkout routes
- [ ] A course favorited/added to cart while logged out is still present after logging in
- [ ] All content renders correctly in both `ar` and `en`

## Expected Outcomes

A working mock account layer — login, favorites, cart, and a clearly-labeled demo checkout — that closes the loop on the Phase 5 "browse → favorite → enroll" journey, demonstrable start to finish in a client walkthrough.

## Task Checklist

- [ ] `auth.api.ts` + `cart.api.ts` + MSW handlers + one seeded user
- [ ] `useAuthStore`, `useCartStore` (Zustand + persist)
- [ ] `LoginForm`, `AuthGuard` components
- [ ] `LoginPage`, `FavoritesPage`, `CartPage`, `CheckoutPage` routes
- [ ] Pre-login → post-login cart/favorites merge logic
- [ ] Visible "Demo Mode" badge on the checkout flow
- [ ] Account layer i18n keys (`account.json`, both locales)
- [ ] Unit tests for auth store, cart store, and the merge-on-login logic

## Notes / Risks

- Must be unambiguous in the UI that checkout is fully mocked — a visible "Demo Mode" badge avoids client confusion mid-pitch.
- Session persistence via `localStorage` survives refresh but not across browsers/devices — acceptable for a demo, but document the limitation in the walkthrough.
- Decide and test explicitly: does cart/favorites state added while logged out survive and merge correctly after login? This is a common and easy-to-miss bug.
