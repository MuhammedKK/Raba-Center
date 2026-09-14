import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import { AnimatedSection } from '@/shared/components/composed/AnimatedSection'

export function ServiceCtaBanner() {
  const { t } = useTranslation('services')
  const { locale } = useParams<{ locale: string }>()

  return (
    <AnimatedSection className="from-primary-500 to-accent-500 bg-gradient-to-r py-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">{t('banner.title')}</h2>
        <p className="max-w-xl text-white/85">{t('banner.subtitle')}</p>
        <Link
          to={`/${locale}/contact`}
          className="text-primary-700 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-medium transition-colors hover:bg-white/90"
        >
          {t('banner.cta')}
        </Link>
      </div>
    </AnimatedSection>
  )
}
