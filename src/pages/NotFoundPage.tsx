import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import { Button } from '@/shared/components/ui'

export default function NotFoundPage() {
  const { t } = useTranslation()
  const { locale = 'ar' } = useParams<{ locale: string }>()

  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
      <h1 className="text-3xl font-bold">{t('placeholder.notFoundTitle')}</h1>
      <p className="text-neutral-700 dark:text-neutral-400">{t('placeholder.notFoundDescription')}</p>
      <Link to={`/${locale}`}>
        <Button>{t('nav.home')}</Button>
      </Link>
    </div>
  )
}
