import { apiClient } from '@/api/client'
import type { Branch } from '@/features/branches/branches.types'

export const branchesApi = {
  getBranches: () => apiClient.get<Branch[]>('/branches'),
}
