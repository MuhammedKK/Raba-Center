import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function ServicesHero() {
  const { t } = useTranslation('services')

  return (
    <section className="from-primary-50/60 relative overflow-hidden bg-gradient-to-b to-white/30 py-20">
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-primary-700 ring-primary-100 mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold shadow-sm ring-1"
        >
          {t('hero.eyebrow')}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl leading-tight font-extrabold text-neutral-900 sm:text-5xl"
        >
          {t('hero.title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-neutral-700"
        >
          {t('hero.subtitle')}
        </motion.p>
      </div>
    </section>
  )
}
