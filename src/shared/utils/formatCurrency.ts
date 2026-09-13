import type { Locale } from '@/types/common.types'

export function formatCurrency(amount: number, locale: Locale = 'ar') {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-SA', {
    style: 'currency',
    currency: 'SAR',
    maximumFractionDigits: 0,
  }).format(amount)
}
