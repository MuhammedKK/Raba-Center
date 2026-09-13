import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'
import type { Locale } from '@/types/common.types'

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const params = useParams<{ locale: Locale }>()

  function switchLanguage() {
    const nextLocale: Locale = i18n.language === 'ar' ? 'en' : 'ar'
    void i18n.changeLanguage(nextLocale)

    const currentLocale = params.locale
    const path = window.location.pathname
    const nextPath = currentLocale
      ? path.replace(`/${currentLocale}`, `/${nextLocale}`)
      : `/${nextLocale}`
    navigate(nextPath)
  }

  return (
    <button
      type="button"
      onClick={switchLanguage}
      className="hover:bg-primary-50 hover:text-primary-700 flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-neutral-700"
    >
      <Languages className="size-4" aria-hidden />
      {t('language.switchTo')}
    </button>
  )
}
