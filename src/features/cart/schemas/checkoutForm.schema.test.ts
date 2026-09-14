import { describe, expect, it } from 'vitest'
import { createCheckoutFormSchema } from './checkoutForm.schema'
import i18n from '@/i18n'

const t = i18n.getFixedT('en', 'account')
const schema = createCheckoutFormSchema(t)

const validPayload = {
  address: 'King Fahd Road, Al Olaya, Riyadh',
  cardBrand: 'visa' as const,
  cardNumber: '4242 4242 4242 4242',
  expiry: '09/28',
  cvc: '123',
}

describe('createCheckoutFormSchema', () => {
  it('accepts a valid visa payload', () => {
    expect(schema.safeParse(validPayload).success).toBe(true)
  })

  it('accepts a valid mastercard payload', () => {
    expect(
      schema.safeParse({
        ...validPayload,
        cardBrand: 'mastercard',
        cardNumber: '5105 1051 0510 5100',
      }).success,
    ).toBe(true)
  })

  it('rejects a too-short address', () => {
    expect(schema.safeParse({ ...validPayload, address: 'x' }).success).toBe(false)
  })

  it('rejects an invalid card number', () => {
    expect(schema.safeParse({ ...validPayload, cardNumber: '1234' }).success).toBe(false)
  })

  it('rejects a card number that does not match the selected brand', () => {
    // A Mastercard-format number submitted while "visa" is selected.
    expect(schema.safeParse({ ...validPayload, cardNumber: '5105 1051 0510 5100' }).success).toBe(
      false,
    )
  })

  it('rejects an invalid expiry format', () => {
    expect(schema.safeParse({ ...validPayload, expiry: '13/28' }).success).toBe(false)
    expect(schema.safeParse({ ...validPayload, expiry: '9/28' }).success).toBe(false)
  })

  it('rejects an invalid cvc', () => {
    expect(schema.safeParse({ ...validPayload, cvc: '12' }).success).toBe(false)
  })
})
