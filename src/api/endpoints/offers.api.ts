import { apiClient } from '@/api/client'
import type { Offer } from '@/features/home/home.types'

export const offersApi = {
  getOffers: () => apiClient.get<Offer[]>('/offers'),
}
