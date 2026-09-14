# Phase 8: Contact & Lead-Gen Forms

## Status

Done — three RHF+Zod validated forms (Inquiry/Home Service/Shadow Teacher) as tabs, wired to the Phase 4 `?service=` handoff, with localized inline errors and a mock submit flow.

## Business

This is the actual monetizable outcome of the entire marketing site — every other page exists to funnel here. Three distinct form types map to three real service lines (general inquiry, home-service request, shadow-teacher/school-support request), which a client will specifically check for.

## User Story

As a parent who has decided to reach out, I want a simple, clearly-validated form matched to the specific type of help I need, so that I can submit my request confidently and know it went through.

## Acceptance Criteria

- [x] Contact page renders general `InquiryForm` (name/email/phone/message), validated with React Hook Form + Zod
- [x] `HomeServiceRequestForm` and `ShadowTeacherRequestForm` render as tabs on the same page (shared `Tabs` component from Phase 1)
- [x] The Services page (Phase 4) CTA correctly pre-selects the relevant form/tab via its query param — `?service=home-services` → Home Service tab, `?service=shadow-teacher` → Shadow Teacher tab, everything else → General Inquiry
- [x] Submitting any form shows a success state; invalid input shows localized inline errors (real Arabic error copy, not just translated labels) — verified by unit test asserting en/ar error messages actually differ
- [x] Contact info card (phone/email/WhatsApp/socials) renders
- [x] All forms are submitted through `contact.api.ts` + a mock MSW handler
- [x] All content renders correctly in both `ar` and `en`

## Expected Outcomes

Three working, validated lead-gen forms wired to the mock API layer, with the Phase 4 service-selection handoff proven end-to-end — the clearest "this generates real business value" moment in the demo.

## Task Checklist

- [x] `contact.api.ts` + MSW handler (3 mock POST endpoints, each returns a `referenceId`)
- [x] Zod schemas per form (`inquiryForm.schema.ts`, `homeServiceRequest.schema.ts`, `shadowTeacherRequest.schema.ts`) with localized error messages — schemas are factory functions `createXSchema(t)` so error strings come from `contact.json`, not hardcoded English
- [x] `InquiryForm`, `HomeServiceRequestForm`, `ShadowTeacherRequestForm`, `ContactInfoCard` components
- [x] Tab wiring that reads the Phase 4 query param to pre-select the right form
- [x] Contact page i18n keys (`contact.json`, both locales)
- [x] Unit tests for each form's validation logic (valid/invalid cases) — `contactForms.test.ts`, 14 cases covering all 3 schemas plus a locale-divergence check

## Notes / Risks

- Localized errors solved differently than the original "wire an `errorMap`" idea: Zod v4's `errorMap` API was superseded, so instead each schema is a factory function `createXSchema(t: TFunction)` called from the component with `useMemo(() => createXSchema(t), [t])` — the calling component passes real translated strings straight into `.min()`/`.regex()`/etc. as the message argument. Simpler than global `errorMap` wiring and keeps schemas trivially unit-testable (pass any `t`, real or fake).
- Phone number input is a simple regex-validated text field (`+?[0-9 ]{7,15}`), not a phone-input library — proportionate to the demo as planned.
- `ShadowTeacherRequestForm`'s `childAge` field needed `z.coerce.number()` (raw `<input type="number">` values arrive as strings). This makes the schema's input and output types diverge (`string` in, `number` out), which required `useForm<Input, unknown, Output>` generics instead of a single type — worth knowing before adding more coerced fields elsewhere.
- Fixed a duplication flagged in Phase 6: the main phone number was hardcoded separately in `Footer.tsx` and `BranchesPhoneBanner.tsx`. Added `src/shared/constants/contact.ts` (`MAIN_PHONE`/`MAIN_WHATSAPP`/`MAIN_EMAIL`) and pointed both existing usages plus the new `ContactInfoCard` at it — one source of truth now for when a real number replaces the placeholder.
