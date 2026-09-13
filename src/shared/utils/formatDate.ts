import type { Locale } from '@/types/common.types'

export function formatDate(date: string | Date, locale: Locale = 'ar') {
  const value = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(value)
}
