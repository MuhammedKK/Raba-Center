import { apiClient } from '@/api/client'
import type { AuthUser } from '@/features/auth/auth.types'

export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post<{ user: AuthUser }>('/auth/login', { email, password }),
}
