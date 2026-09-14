import type { ReactNode } from 'react'
import { Navigate, useLocation, useParams } from 'react-router'
import { useAuthStore } from '@/features/auth/store/useAuthStore'

export function AuthGuard({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const location = useLocation()
  const { locale = 'ar' } = useParams<{ locale: string }>()

  if (!isAuthenticated) {
    const redirectTo = encodeURIComponent(location.pathname)
    return <Navigate to={`/${locale}/login?redirectTo=${redirectTo}`} replace />
  }

  return <>{children}</>
}
