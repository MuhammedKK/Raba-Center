export type Locale = 'ar' | 'en'

export type Direction = 'rtl' | 'ltr'

export interface ApiResponse<T> {
  data: T
}

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export interface LocalizedText {
  ar: string
  en: string
}
