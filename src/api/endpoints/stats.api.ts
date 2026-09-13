import { apiClient } from '@/api/client'
import type { OrgStat } from '@/mocks/data/stats.data'

export const statsApi = {
  getStats: () => apiClient.get<OrgStat[]>('/stats'),
}
