import { describe, expect, it } from 'vitest'
import { createHomeServiceRequestSchema } from './homeServiceRequest.schema'
import { createInquiryFormSchema } from './inquiryForm.schema'
import { createShadowTeacherRequestSchema } from './shadowTeacherRequest.schema'
import i18n from '@/i18n'

const tEn = i18n.getFixedT('en', 'contact')
const tAr = i18n.getFixedT('ar', 'contact')

describe('createInquiryFormSchema', () => {
  const schema = createInquiryFormSchema(tEn)
  const validPayload = {
    name: 'Sara Al-Ahmad',
    email: 'sara@example.com',
    phone: '+966 50 123 4567',
    message: 'I would like to know more about your ABA programs.',
  }

  it('accepts a valid payload', () => {
    expect(schema.safeParse(validPayload).success).toBe(true)
  })

  it('rejects a name that is too short', () => {
    const result = schema.safeParse({ ...validPayload, name: 'S' })
    expect(result.success).toBe(false)
  })

  it('rejects an invalid email', () => {
    const result = schema.safeParse({ ...validPayload, email: 'not-an-email' })
    expect(result.success).toBe(false)
  })

  it('rejects an invalid phone number', () => {
    const result = schema.safeParse({ ...validPayload, phone: 'abc' })
    expect(result.success).toBe(false)
  })

  it('rejects a message shorter than 10 characters', () => {
    const result = schema.safeParse({ ...validPayload, message: 'too short' })
    expect(result.success).toBe(false)
  })

  it('produces localized error messages per locale', () => {
    const enResult = createInquiryFormSchema(tEn).safeParse({ ...validPayload, email: 'bad' })
    const arResult = createInquiryFormSchema(tAr).safeParse({ ...validPayload, email: 'bad' })
    expect(enResult.success).toBe(false)
    expect(arResult.success).toBe(false)
    if (!enResult.success && !arResult.success) {
      expect(enResult.error.issues[0]?.message).not.toEqual(arResult.error.issues[0]?.message)
    }
  })
})

describe('createHomeServiceRequestSchema', () => {
  const schema = createHomeServiceRequestSchema(tEn)
  const validPayload = {
    name: 'Faisal Al-Zahrani',
    phone: '+966501234567',
    address: 'King Fahd Road, Al Olaya, Riyadh',
  }

  it('accepts a valid payload with optional notes omitted', () => {
    expect(schema.safeParse(validPayload).success).toBe(true)
  })

  it('accepts a valid payload with notes provided', () => {
    expect(schema.safeParse({ ...validPayload, notes: 'Afternoons preferred' }).success).toBe(true)
  })

  it('rejects a missing/too-short address', () => {
    expect(schema.safeParse({ ...validPayload, address: 'x' }).success).toBe(false)
  })

  it('rejects notes over 500 characters', () => {
    const result = schema.safeParse({ ...validPayload, notes: 'a'.repeat(501) })
    expect(result.success).toBe(false)
  })
})

describe('createShadowTeacherRequestSchema', () => {
  const schema = createShadowTeacherRequestSchema(tEn)
  const validPayload = {
    name: 'Noura Al-Qahtani',
    phone: '+966501234567',
    schoolName: 'Riyadh International School',
    childAge: '7',
  }

  it('accepts a valid payload and coerces childAge to a number', () => {
    const result = schema.safeParse(validPayload)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.childAge).toBe(7)
    }
  })

  it('rejects a missing school name', () => {
    expect(schema.safeParse({ ...validPayload, schoolName: '' }).success).toBe(false)
  })

  it('rejects an out-of-range child age', () => {
    expect(schema.safeParse({ ...validPayload, childAge: '25' }).success).toBe(false)
  })

  it('rejects a non-numeric child age', () => {
    expect(schema.safeParse({ ...validPayload, childAge: 'abc' }).success).toBe(false)
  })
})
