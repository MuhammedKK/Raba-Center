import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Outlet, useParams } from 'react-router'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { AmbientBackground } from '@/shared/components/composed/AmbientBackground'
import { PageTransition } from '@/shared/components/composed/PageTransition'
import type { Locale } from '@/types/common.types'

const SUPPORTED_LOCALES: Locale[] = ['ar', 'en']

export function MainLayout() {
  const { i18n } = useTranslation()
  const { locale } = useParams<{ locale: string }>()

  useEffect(() => {
    if (locale && locale !== i18n.language) {
      void i18n.changeLanguage(locale)
    }
  }, [locale, i18n])

  if (!locale || !SUPPORTED_LOCALES.includes(locale as Locale)) {
    return <Navigate to="/ar" replace />
  }

  return (
    <div className="isolate flex min-h-screen flex-col">
      <AmbientBackground />
      <Header />
      <main className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}
