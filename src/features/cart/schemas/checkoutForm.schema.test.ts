import { describe, expect, it } from 'vitest'
import { createCheckoutFormSchema } from './checkoutForm.schema'
import i18n from '@/i18n'

const t = i18n.getFixedT('en', 'account')
const schema = createCheckoutFormSchema(t)

const validPayload = {
  address: 'King Fahd Road, Al Olaya, Riyadh',
  cardNumber: '4242 4242 4242 4242',
  expiry: '09/28',
  cvc: '123',
}

describe('createCheckoutFormSchema', () => {
  it('accepts a valid payload', () => {
    expect(schema.safeParse(validPayload).success).toBe(true)
  })

  it('rejects a too-short address', () => {
    expect(schema.safeParse({ ...validPayload, address: 'x' }).success).toBe(false)
  })

  it('rejects an invalid card number', () => {
    expect(schema.safeParse({ ...validPayload, cardNumber: '1234' }).success).toBe(false)
  })

  it('rejects an invalid expiry format', () => {
    expect(schema.safeParse({ ...validPayload, expiry: '13/28' }).success).toBe(false)
    expect(schema.safeParse({ ...validPayload, expiry: '9/28' }).success).toBe(false)
  })

  it('rejects an invalid cvc', () => {
    expect(schema.safeParse({ ...validPayload, cvc: '12' }).success).toBe(false)
  })
})
