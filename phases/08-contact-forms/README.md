# Phase 8: Contact & Lead-Gen Forms

## Status

Not Started

## Business

This is the actual monetizable outcome of the entire marketing site — every other page exists to funnel here. Three distinct form types map to three real service lines (general inquiry, home-service request, shadow-teacher/school-support request), which a client will specifically check for.

## User Story

As a parent who has decided to reach out, I want a simple, clearly-validated form matched to the specific type of help I need, so that I can submit my request confidently and know it went through.

## Acceptance Criteria

- [ ] Contact page renders general `InquiryForm` (name/email/phone/message), validated with React Hook Form + Zod
- [ ] `HomeServiceRequestForm` and `ShadowTeacherRequestForm` render as tabs on the same page
- [ ] The Services page (Phase 4) CTA correctly pre-selects the relevant form/tab via its query param
- [ ] Submitting any form shows a success state; invalid input shows localized inline errors (not just translated labels — real Arabic error copy)
- [ ] Contact info card (phone/email/WhatsApp/socials) renders
- [ ] All forms are submitted through `contact.api.ts` + a mock MSW handler
- [ ] All content renders correctly in both `ar` and `en`

## Expected Outcomes

Three working, validated lead-gen forms wired to the mock API layer, with the Phase 4 service-selection handoff proven end-to-end — the clearest "this generates real business value" moment in the demo.

## Task Checklist

- [ ] `contact.api.ts` + MSW handler
- [ ] Zod schemas per form (`inquiryForm.schema.ts`, `homeServiceRequest.schema.ts`, `shadowTeacherRequest.schema.ts`) with localized error messages
- [ ] `InquiryForm`, `HomeServiceRequestForm`, `ShadowTeacherRequestForm`, `ContactInfoCard` components
- [ ] Tab wiring that reads the Phase 4 query param to pre-select the right form
- [ ] Contact page i18n keys (`contact.json`, both locales)
- [ ] Unit tests for each form's validation logic (valid/invalid cases)

## Notes / Risks

- Zod's `errorMap` needs explicit i18n wiring — it's easy to translate field labels but forget validation error messages, leaving English errors on an Arabic form.
- Phone number input: use a simple pattern-validated text field, not a heavy international phone-input dependency — keep this proportionate to a demo.
