import { describe, expect, it } from 'vitest'
import { buildMapsLink, buildWhatsAppLink } from './branches.utils'
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

describe('buildMapsLink', () => {
  it('URL-encodes the address as a Google Maps search query', () => {
    const link = buildMapsLink('King Fahd Road, Riyadh')
    expect(link).toBe(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('King Fahd Road, Riyadh')}`,
    )
  })

  it('uses the correct address text per locale, given branch data + locale', () => {
    const tEn = i18n.getFixedT('en', 'branches')
    const tAr = i18n.getFixedT('ar', 'branches')

    const enLink = buildMapsLink(tEn(branch.address))
    const arLink = buildMapsLink(tAr(branch.address))

    expect(enLink).not.toEqual(arLink)
    expect(enLink).toContain(encodeURIComponent(tEn(branch.address)))
    expect(arLink).toContain(encodeURIComponent(tAr(branch.address)))
  })
})
