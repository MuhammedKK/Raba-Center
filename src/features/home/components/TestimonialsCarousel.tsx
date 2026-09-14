import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Testimonial } from '@/features/home/home.types'
import { AnimatedSection } from '@/shared/components/composed/AnimatedSection'
import { Avatar } from '@/shared/components/composed/Avatar'
import { SectionHeading } from '@/shared/components/composed/SectionHeading'
import { RatingStars } from '@/shared/components/ui'
import { useDirection } from '@/shared/hooks/useDirection'
import { cn } from '@/shared/utils/cn'

const AUTOPLAY_INTERVAL_MS = 6000
const SWIPE_THRESHOLD = 60

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const { t } = useTranslation('home')
  const direction = useDirection()
  const prefersReducedMotion = useReducedMotion()
  const isRtl = direction === 'rtl'

  const [[index, forward], setState] = useState<[number, 1 | -1]>([0, 1])
  const [isPaused, setIsPaused] = useState(false)

  const count = testimonials.length

  const paginate = useCallback(
    (step: 1 | -1) => {
      setState(([current]) => [(current + step + count) % count, step])
    },
    [count],
  )

  useEffect(() => {
    if (isPaused || prefersReducedMotion || count <= 1) return
    const id = setInterval(() => paginate(1), AUTOPLAY_INTERVAL_MS)
    return () => clearInterval(id)
  }, [isPaused, prefersReducedMotion, paginate, count])

  if (count === 0) return null

  const current = testimonials[index]
  const physicalForward = isRtl ? -forward : forward

  return (
    <AnimatedSection className="bg-white/50 py-20 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          align="center"
          eyebrow={t('testimonials.eyebrow')}
          title={t('testimonials.title')}
        />

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {count > 1 && (
            <>
              <button
                type="button"
                aria-label={t('testimonials.previous')}
                onClick={() => paginate(-1)}
                className="hover:text-primary-700 hover:ring-primary-200 absolute start-0 top-1/2 z-10 flex size-10 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-600 shadow-md ring-1 ring-neutral-200 transition sm:-start-4 rtl:translate-x-2"
              >
                {isRtl ? (
                  <ChevronRight className="size-5" aria-hidden />
                ) : (
                  <ChevronLeft className="size-5" aria-hidden />
                )}
              </button>
              <button
                type="button"
                aria-label={t('testimonials.next')}
                onClick={() => paginate(1)}
                className="hover:text-primary-700 hover:ring-primary-200 absolute end-0 top-1/2 z-10 flex size-10 translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-600 shadow-md ring-1 ring-neutral-200 transition sm:-end-4 rtl:-translate-x-2"
              >
                {isRtl ? (
                  <ChevronLeft className="size-5" aria-hidden />
                ) : (
                  <ChevronRight className="size-5" aria-hidden />
                )}
              </button>
            </>
          )}

          <Quote className="text-primary-200 mx-auto mb-4 size-8" aria-hidden />

          <div className="relative min-h-56 overflow-hidden">
            <AnimatePresence mode="wait" custom={physicalForward} initial={false}>
              <motion.figure
                key={current.id}
                custom={physicalForward}
                // Drag stays enabled under prefers-reduced-motion: it's a user-initiated
                // interaction, not automatic motion — only the transition below simplifies.
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  const effectiveOffset = isRtl ? -info.offset.x : info.offset.x
                  if (effectiveOffset < -SWIPE_THRESHOLD) paginate(1)
                  else if (effectiveOffset > SWIPE_THRESHOLD) paginate(-1)
                }}
                initial={
                  prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: physicalForward * 48 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: physicalForward * -48 }
                }
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="cursor-grab text-center active:cursor-grabbing"
              >
                <blockquote className="text-lg font-medium text-neutral-900 sm:text-xl">
                  “{t(current.quote)}”
                </blockquote>
                <RatingStars value={current.rating} className="mt-4 justify-center" />
                <figcaption className="mt-4 flex items-center justify-center gap-3">
                  <Avatar name={t(current.authorName)} />
                  <span className="text-start">
                    <span className="block font-semibold text-neutral-900">
                      {t(current.authorName)}
                    </span>
                    <span className="text-sm text-neutral-400">{t(current.authorRole)}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((testimonial, dotIndex) => (
              <button
                key={testimonial.id}
                type="button"
                aria-label={`${dotIndex + 1}`}
                aria-current={dotIndex === index}
                onClick={() => setState([dotIndex, dotIndex > index ? 1 : -1])}
                className={cn(
                  'h-2 rounded-full transition-all',
                  dotIndex === index
                    ? 'bg-primary-500 w-6'
                    : 'w-2 bg-neutral-200 hover:bg-neutral-400',
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
