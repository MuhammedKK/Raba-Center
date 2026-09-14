import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authApi } from '@/api/endpoints/auth.api'
import type { AuthUser } from '@/features/auth/auth.types'

interface AuthState {
  isAuthenticated: boolean
  user: AuthUser | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

// Mock auth for the demo: validated against a single seeded user record
// (`mocks/data/users.data.ts`) through the API layer — not a real backend.
// Favorites/cart state lives in their own persisted stores untouched by
// login/logout, so anything added while signed out is still there afterward.
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (email, password) => {
        try {
          const { user } = await authApi.login(email, password)
          set({ isAuthenticated: true, user })
          return true
        } catch {
          return false
        }
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    { name: 'raba-center-auth' },
  ),
)
