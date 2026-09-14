import type { Variants } from 'framer-motion'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, HeartHandshake, Sparkles, Stethoscope, Users } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import heroPhoto from '@/assets/images/hero/hero-therapist-child.jpg'
import { Button } from '@/shared/components/ui'

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const photoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
}

const highlightIcons = [HeartHandshake, Stethoscope, Sparkles]

export function HeroSection() {
  const { t } = useTranslation('home')
  const { locale } = useParams<{ locale: string }>()
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="from-primary-50/60 dark:from-primary-900/30 relative overflow-hidden bg-gradient-to-b to-white/30 dark:to-neutral-950/30">
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-start"
          >
            <motion.span
              variants={itemVariants}
              className="text-primary-700 ring-primary-100 dark:text-primary-300 dark:ring-primary-800 mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold shadow-sm ring-1 dark:bg-neutral-900"
            >
              <Sparkles className="size-4" aria-hidden />
              {t('hero.eyebrow')}
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="text-4xl leading-tight font-extrabold text-neutral-900 sm:text-5xl dark:text-neutral-50"
            >
              {t('hero.title')}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-lg text-neutral-700 dark:text-neutral-400"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-9 flex flex-wrap items-center gap-4">
              <Link to={`/${locale}/contact`}>
                <MagneticButton>{t('hero.primaryCta')}</MagneticButton>
              </Link>
              <Link to={`/${locale}/services`}>
                <Button variant="outline" size="lg">
                  {t('hero.secondaryCta')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={photoVariants}
            initial="hidden"
            animate="visible"
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="from-primary-500 to-accent-500 absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-tr opacity-30 blur-xl" />
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-neutral-900/5">
              <img
                src={heroPhoto}
                alt=""
                className="size-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>

            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute -start-6 -bottom-6 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-neutral-100 dark:bg-neutral-900 dark:ring-neutral-800"
            >
              <span className="bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 flex size-11 shrink-0 items-center justify-center rounded-full">
                <Users className="size-5" aria-hidden />
              </span>
              <span className="text-start">
                <span className="block text-lg font-extrabold text-neutral-900 dark:text-neutral-50">
                  {t('hero.floatingStat.value')}
                </span>
                <span className="block text-xs font-medium text-neutral-400">
                  {t('hero.floatingStat.label')}
                </span>
              </span>
            </motion.div>
          </motion.div>
        </div>

        <motion.ul
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-16 grid w-full grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {(['assessment', 'intervention', 'support'] as const).map((key, index) => {
            const Icon = highlightIcons[index]
            return (
              <li
                key={key}
                className="flex items-center gap-3 rounded-2xl bg-white/70 p-4 text-start shadow-sm ring-1 ring-neutral-200 backdrop-blur dark:bg-neutral-900/70 dark:ring-neutral-800"
              >
                <span className="bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 flex size-10 shrink-0 items-center justify-center rounded-full">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {t(`hero.highlights.${key}`)}
                </span>
              </li>
            )
          })}
        </motion.ul>
      </div>

      {!prefersReducedMotion && (
        <motion.div
          className="relative flex justify-center pb-8"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="size-5 text-neutral-400" aria-hidden />
        </motion.div>
      )}
    </section>
  )
}

function MagneticButton({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="inline-block"
      whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Button size="lg">{children}</Button>
    </motion.div>
  )
}
