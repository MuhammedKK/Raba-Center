import type { Variants } from 'framer-motion'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, HeartHandshake, Sparkles, Stethoscope } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import { Button } from '@/shared/components/ui'

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const highlightIcons = [HeartHandshake, Stethoscope, Sparkles]

export function HeroSection() {
  const { t } = useTranslation('home')
  const { locale } = useParams<{ locale: string }>()
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="from-primary-50 relative overflow-hidden bg-gradient-to-b to-white">
      {!prefersReducedMotion && (
        <>
          <motion.div
            aria-hidden
            className="bg-primary-200/50 absolute -start-24 -top-24 size-96 rounded-full blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="bg-accent-100/60 absolute -end-32 top-1/3 size-[28rem] rounded-full blur-3xl"
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="bg-hope-100/50 absolute start-1/4 bottom-0 size-72 rounded-full blur-3xl"
            animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32"
      >
        <motion.span
          variants={itemVariants}
          className="text-primary-700 ring-primary-100 mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold shadow-sm ring-1"
        >
          <Sparkles className="size-4" aria-hidden />
          {t('hero.eyebrow')}
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="text-4xl leading-tight font-extrabold text-neutral-900 sm:text-5xl md:text-6xl"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p variants={itemVariants} className="mt-6 max-w-2xl text-lg text-neutral-700">
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Link to={`/${locale}/contact`}>
            <MagneticButton>{t('hero.primaryCta')}</MagneticButton>
          </Link>
          <Link to={`/${locale}/services`}>
            <Button variant="outline" size="lg">
              {t('hero.secondaryCta')}
            </Button>
          </Link>
        </motion.div>

        <motion.ul
          variants={itemVariants}
          className="mt-14 grid w-full grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {(['assessment', 'intervention', 'support'] as const).map((key, index) => {
            const Icon = highlightIcons[index]
            return (
              <li
                key={key}
                className="flex items-center gap-3 rounded-2xl bg-white/70 p-4 text-start shadow-sm ring-1 ring-neutral-200 backdrop-blur"
              >
                <span className="bg-primary-100 text-primary-700 flex size-10 shrink-0 items-center justify-center rounded-full">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="text-sm font-medium text-neutral-700">
                  {t(`hero.highlights.${key}`)}
                </span>
              </li>
            )
          })}
        </motion.ul>
      </motion.div>

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
