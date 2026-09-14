import type { TFunction } from 'i18next'
import { z } from 'zod'

const cardNumberPatternByBrand = {
  visa: /^4\d{3} ?\d{4} ?\d{4} ?\d{4}$/,
  mastercard: /^5[1-5]\d{2} ?\d{4} ?\d{4} ?\d{4}$/,
} as const

export function createCheckoutFormSchema(t: TFunction<'account'>) {
  return z
    .object({
      address: z.string().trim().min(5, t('checkout.errors.addressRequired')),
      cardBrand: z.enum(['visa', 'mastercard'], t('checkout.errors.cardBrandRequired')),
      cardNumber: z.string().trim(),
      expiry: z
        .string()
        .trim()
        .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, t('checkout.errors.expiryInvalid')),
      cvc: z
        .string()
        .trim()
        .regex(/^\d{3,4}$/, t('checkout.errors.cvcInvalid')),
    })
    .superRefine((values, ctx) => {
      const pattern = cardNumberPatternByBrand[values.cardBrand]
      if (!pattern.test(values.cardNumber)) {
        ctx.addIssue({
          code: 'custom',
          path: ['cardNumber'],
          message: t('checkout.errors.cardNumberInvalid'),
        })
      }
    })
}

export type CheckoutFormValues = z.infer<ReturnType<typeof createCheckoutFormSchema>>
