import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function ServicesHero() {
  const { t } = useTranslation('services')

  return (
    <section className="from-primary-50/60 dark:from-primary-900/30 relative overflow-hidden bg-gradient-to-b to-white/30 py-20 dark:to-neutral-950/30">
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-primary-700 ring-primary-100 dark:text-primary-300 dark:ring-primary-800 mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold shadow-sm ring-1 dark:bg-neutral-900"
        >
          {t('hero.eyebrow')}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl leading-tight font-extrabold text-neutral-900 sm:text-5xl dark:text-neutral-50"
        >
          {t('hero.title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-neutral-700 dark:text-neutral-400"
        >
          {t('hero.subtitle')}
        </motion.p>
      </div>
    </section>
  )
}
