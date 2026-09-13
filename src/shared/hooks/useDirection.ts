import { useTranslation } from 'react-i18next'
import type { Direction } from '@/types/common.types'

const RTL_LOCALES = new Set(['ar'])

export function useDirection(): Direction {
  const { i18n } = useTranslation()
  return RTL_LOCALES.has(i18n.language) ? 'rtl' : 'ltr'
}
