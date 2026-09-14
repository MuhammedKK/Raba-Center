import { apiClient } from '@/api/client'
import type { TeamMember } from '@/features/about/about.types'

export const teamApi = {
  getTeam: () => apiClient.get<TeamMember[]>('/team'),
}
