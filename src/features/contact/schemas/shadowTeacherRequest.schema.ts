import type { TFunction } from 'i18next'
import { z } from 'zod'

export function createShadowTeacherRequestSchema(t: TFunction<'contact'>) {
  return z.object({
    name: z.string().trim().min(2, t('errors.nameRequired')),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9 ]{7,15}$/, t('errors.phoneInvalid')),
    schoolName: z.string().trim().min(2, t('errors.schoolNameRequired')),
    childAge: z.coerce
      .number(t('errors.childAgeInvalid'))
      .int(t('errors.childAgeInvalid'))
      .min(2, t('errors.childAgeInvalid'))
      .max(18, t('errors.childAgeInvalid')),
  })
}

type ShadowTeacherRequestSchema = ReturnType<typeof createShadowTeacherRequestSchema>

// `childAge` is `z.coerce.number()`, so the raw form input (string from the
// <input>) and the parsed output (number) differ — RHF needs both.
export type ShadowTeacherRequestInput = z.input<ShadowTeacherRequestSchema>
export type ShadowTeacherRequestValues = z.output<ShadowTeacherRequestSchema>
