import { apiClient } from '@/api/client'
import type { Trainer } from '@/features/trainers/trainers.types'

export const trainersApi = {
  getTrainers: () => apiClient.get<Trainer[]>('/trainers'),
  getTrainerBySlug: (slug: string) => apiClient.get<Trainer>(`/trainers/${slug}`),
}
