import type { TFunction } from 'i18next'
import { z } from 'zod'

export function createHomeServiceRequestSchema(t: TFunction<'contact'>) {
  return z.object({
    name: z.string().trim().min(2, t('errors.nameRequired')),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9 ]{7,15}$/, t('errors.phoneInvalid')),
    address: z.string().trim().min(5, t('errors.addressRequired')),
    notes: z.string().trim().max(500, t('errors.notesTooLong')).optional().or(z.literal('')),
  })
}

export type HomeServiceRequestValues = z.infer<ReturnType<typeof createHomeServiceRequestSchema>>
