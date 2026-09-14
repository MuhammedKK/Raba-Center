import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface PageScaffoldProps {
  title: string
  phaseLabel?: string
  children?: ReactNode
}

export function PageScaffold({ title, phaseLabel, children }: PageScaffoldProps) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-6xl px-4 py-16 sm:px-6"
    >
      {phaseLabel && (
        <span className="bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold">
          {phaseLabel}
        </span>
      )}
      <h1 className="mb-3 text-3xl font-bold sm:text-4xl">{title}</h1>
      <p className="max-w-2xl text-neutral-700 dark:text-neutral-400">{t('placeholder.description')}</p>
      {children}
    </motion.div>
  )
}
