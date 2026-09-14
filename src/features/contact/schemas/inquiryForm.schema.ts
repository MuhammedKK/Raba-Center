import type { TFunction } from 'i18next'
import { z } from 'zod'

export function createInquiryFormSchema(t: TFunction<'contact'>) {
  return z.object({
    name: z.string().trim().min(2, t('errors.nameRequired')),
    email: z.email(t('errors.emailInvalid')),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9 ]{7,15}$/, t('errors.phoneInvalid')),
    message: z.string().trim().min(10, t('errors.messageTooShort')),
  })
}

export type InquiryFormValues = z.infer<ReturnType<typeof createInquiryFormSchema>>
