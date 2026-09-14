import type { TFunction } from 'i18next'
import { z } from 'zod'

export function createLoginFormSchema(t: TFunction<'account'>) {
  return z.object({
    email: z.email(t('login.errors.emailInvalid')),
    password: z.string().min(1, t('login.errors.passwordRequired')),
  })
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginFormSchema>>
