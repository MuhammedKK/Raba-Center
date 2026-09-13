import { apiClient } from '@/api/client'
import type { Accreditation } from '@/features/home/home.types'

export const accreditationsApi = {
  getCredentials: () => apiClient.get<Accreditation[]>('/credentials'),
  getAccreditations: () => apiClient.get<Accreditation[]>('/accreditations'),
}
