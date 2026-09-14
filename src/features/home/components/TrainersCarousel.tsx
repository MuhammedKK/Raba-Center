import { motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import { TrainerCard } from '@/features/trainers/components/TrainerCard'
import type { Trainer } from '@/features/trainers/trainers.types'
import { AnimatedSection } from '@/shared/components/composed/AnimatedSection'
import { SectionHeading } from '@/shared/components/composed/SectionHeading'
import { Button } from '@/shared/components/ui'
import { useDirection } from '@/shared/hooks/useDirection'
import { useMediaQuery } from '@/shared/hooks/useMediaQuery'
import { cn } from '@/shared/utils/cn'

const AUTOPLAY_INTERVAL_MS = 5000

export function TrainersCarousel({ trainers }: { trainers: Trainer[] }) {
  const { t } = useTranslation('home')
  const { locale } = useParams<{ locale: string }>()
  const direction = useDirection()
  const isRtl = direction === 'rtl'
  const prefersReducedMotion = useReducedMotion()

  const isLg = useMediaQuery('(min-width: 1024px)')
  const isSm = useMediaQuery('(min-width: 640px)')
  const perView = isLg ? 3 : isSm ? 2 : 1

  const maxIndex = Math.max(0, trainers.length - perView)
  const [rawIndex, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const canNavigate = maxIndex > 0
  const index = Math.min(rawIndex, maxIndex)

  const paginate = useCallback(
    (step: 1 | -1) => {
      const next = index + step
      if (next < 0) setIndex(maxIndex)
      else if (next > maxIndex) setIndex(0)
      else setIndex(next)
    },
    [index, maxIndex],
  )

  useEffect(() => {
    if (isPaused || prefersReducedMotion || !canNavigate) return
    const id = setInterval(() => paginate(1), AUTOPLAY_INTERVAL_MS)
    return () => clearInterval(id)
  }, [isPaused, prefersReducedMotion, canNavigate, paginate])

  if (trainers.length === 0) return null

  const cardPercent = 100 / perView
  const xPercent = isRtl ? index * cardPercent : -index * cardPercent

  return (
    <AnimatedSection className="bg-neutral-50/50 py-20 backdrop-blur-sm dark:bg-neutral-900/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={t('trainers.eyebrow')} title={t('trainers.title')} align="center" />

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          {canNavigate && (
            <>
              <button
                type="button"
                aria-label={t('trainers.previous')}
                onClick={() => paginate(-1)}
                className="hover:text-primary-700 hover:ring-primary-200 absolute start-0 top-1/2 z-10 flex size-10 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-600 shadow-md ring-1 ring-neutral-200 transition dark:bg-neutral-900 dark:text-neutral-300 dark:ring-neutral-700 sm:-start-4 rtl:translate-x-2"
              >
                {isRtl ? (
                  <ChevronRight className="size-5" aria-hidden />
                ) : (
                  <ChevronLeft className="size-5" aria-hidden />
                )}
              </button>
              <button
                type="button"
                aria-label={t('trainers.next')}
                onClick={() => paginate(1)}
                className="hover:text-primary-700 hover:ring-primary-200 absolute end-0 top-1/2 z-10 flex size-10 translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-600 shadow-md ring-1 ring-neutral-200 transition dark:bg-neutral-900 dark:text-neutral-300 dark:ring-neutral-700 sm:-end-4 rtl:-translate-x-2"
              >
                {isRtl ? (
                  <ChevronLeft className="size-5" aria-hidden />
                ) : (
                  <ChevronRight className="size-5" aria-hidden />
                )}
              </button>
            </>
          )}

          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `${xPercent}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {trainers.map((trainer) => (
                <div key={trainer.id} className="shrink-0 px-2.5" style={{ flex: `0 0 ${cardPercent}%` }}>
                  <TrainerCard trainer={trainer} />
                </div>
              ))}
            </motion.div>
          </div>

          {canNavigate && (
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: maxIndex + 1 }, (_, dotIndex) => (
                <button
                  key={dotIndex}
                  type="button"
                  aria-label={`${dotIndex + 1}`}
                  aria-current={dotIndex === index}
                  onClick={() => setIndex(dotIndex)}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    dotIndex === index
                      ? 'bg-primary-500 w-6'
                      : 'w-2 bg-neutral-200 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-500',
                  )}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <Link to={`/${locale}/trainers`}>
            <Button variant="outline" size="lg">
              {t('trainers.showAll')}
            </Button>
          </Link>
        </div>
      </div>
    </AnimatedSection>
  )
}
