import { describe, expect, it } from 'vitest'
import { buildWhatsAppLink } from './whatsapp'
import i18n from '@/i18n'
import { branchesData } from '@/mocks/data/branches.data'

const branch = branchesData[0]

describe('buildWhatsAppLink', () => {
  it('strips non-digit characters from the phone number', () => {
    const link = buildWhatsAppLink('+966 57 510 0100', 'hello')
    expect(link).toBe('https://wa.me/966575100100?text=hello')
  })

  it('URL-encodes the message text', () => {
    const link = buildWhatsAppLink('+966575100100', 'a & b?')
    expect(link).toContain(encodeURIComponent('a & b?'))
    expect(link.startsWith('https://wa.me/966575100100?text=')).toBe(true)
  })

  it('produces a locale-appropriate message for a real branch, given branch data + locale', () => {
    const tEn = i18n.getFixedT('en', 'branches')
    const tAr = i18n.getFixedT('ar', 'branches')

    const enMessage = tEn('whatsapp.message', { branch: tEn(branch.name) })
    const arMessage = tAr('whatsapp.message', { branch: tAr(branch.name) })

    const enLink = buildWhatsAppLink(branch.phone, enMessage)
    const arLink = buildWhatsAppLink(branch.phone, arMessage)

    expect(enLink).not.toEqual(arLink)
    expect(enLink).toContain(encodeURIComponent(tEn(branch.name)))
    expect(arLink).toContain(encodeURIComponent(tAr(branch.name)))
  })
})
