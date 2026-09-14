import { describe, expect, it } from 'vitest'
import { buildMapsLink } from './branches.utils'
import i18n from '@/i18n'
import { branchesData } from '@/mocks/data/branches.data'

const branch = branchesData[0]

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
