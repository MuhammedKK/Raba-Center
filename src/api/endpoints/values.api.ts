import { apiClient } from '@/api/client'
import type { ValueItem } from '@/features/about/about.types'

export const valuesApi = {
  getValues: () => apiClient.get<ValueItem[]>('/values'),
}
