import { apiClient } from '@/api/client'
import type { Service } from '@/features/services/services.types'

export const servicesApi = {
  getServices: () => apiClient.get<Service[]>('/services'),
}
