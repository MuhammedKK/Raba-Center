import { motion } from 'framer-motion'
import { Compass } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import { Button } from '@/shared/components/ui'

export default function NotFoundPage() {
  const { t } = useTranslation()
  const { locale = 'ar' } = useParams<{ locale: string }>()

  return (
    <motion.div
      className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center gap-5 px-4 py-24 text-center sm:px-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="bg-primary-50 text-primary-500 dark:bg-primary-900/30 dark:text-primary-300 flex size-20 items-center justify-center rounded-full">
        <Compass className="size-10" aria-hidden />
      </div>
      <p className="text-primary-500 dark:text-primary-300 text-6xl font-extrabold tracking-tight sm:text-7xl">
        404
      </p>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
        {t('placeholder.notFoundTitle')}
      </h1>
      <p className="text-neutral-700 dark:text-neutral-400">{t('placeholder.notFoundDescription')}</p>
      <Link to={`/${locale}`}>
        <Button size="lg" className="mt-2">
          {t('placeholder.notFoundCta')}
        </Button>
      </Link>
    </motion.div>
  )
}
