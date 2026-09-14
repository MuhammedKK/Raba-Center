import type { TFunction } from 'i18next'
import { z } from 'zod'

export function createCheckoutFormSchema(t: TFunction<'account'>) {
  return z.object({
    address: z.string().trim().min(5, t('checkout.errors.addressRequired')),
    cardNumber: z
      .string()
      .trim()
      .regex(/^\d{4} ?\d{4} ?\d{4} ?\d{4}$/, t('checkout.errors.cardNumberInvalid')),
    expiry: z
      .string()
      .trim()
      .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, t('checkout.errors.expiryInvalid')),
    cvc: z
      .string()
      .trim()
      .regex(/^\d{3,4}$/, t('checkout.errors.cvcInvalid')),
  })
}

export type CheckoutFormValues = z.infer<ReturnType<typeof createCheckoutFormSchema>>
