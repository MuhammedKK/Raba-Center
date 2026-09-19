import { motion } from 'framer-motion'
import { BadgeCheck, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import ahmedImage from '@/assets/images/trainers/ahmed-abu-zaid.jpeg'
import dohaImage from '@/assets/images/trainers/doha-khaled.jpeg'
import hanaaImage from '@/assets/images/trainers/hanaa-bashir.png'
import hishamImage from '@/assets/images/trainers/hisham-salama.png'
import type { Trainer } from '@/features/trainers/trainers.types'
import { FavoriteButton } from '@/shared/components/composed/FavoriteButton'

const imageByTrainer: Record<Trainer['photo'], string> = {
  hanaa: hanaaImage,
  ahmed: ahmedImage,
  hisham: hishamImage,
  doha: dohaImage,
}

/** The reference design reserves a "top rated" flag for the strongest scores. */
const TOP_RATED_THRESHOLD = 4.9

export function TrainerCard({ trainer }: { trainer: Trainer }) {
  const { t } = useTranslation('trainers')
  const { locale } = useParams<{ locale: string }>()
  const name = t(trainer.name)
  const isTopRated = typeof trainer.rating === 'number' && trainer.rating >= TOP_RATED_THRESHOLD

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link
        to={`/${locale}/trainers/${trainer.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06),0_8px_24px_-12px_rgba(16,24,40,0.18)] ring-1 ring-neutral-200/70 transition-shadow duration-300 hover:shadow-[0_2px_4px_rgba(16,24,40,0.06),0_18px_40px_-16px_rgba(16,24,40,0.28)] dark:bg-neutral-900 dark:ring-neutral-800"
      >
        <div className="relative aspect-7/6 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <img
            src={imageByTrainer[trainer.photo]}
            alt=""
            aria-hidden
            loading="lazy"
            className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />

          {isTopRated && (
            <span className="bg-card-badge text-card-badge-text absolute start-4 top-4 rounded-full px-3 py-1.5 text-[11px] font-extrabold tracking-[0.12em] uppercase">
              {t('card.topRated')}
            </span>
          )}

          <FavoriteButton
            id={trainer.id}
            name={name}
            className="absolute end-4 top-4 size-10 shadow-md ring-0"
          />
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            {/* Roles here run much longer than the reference's one-word specialty,
                so they're clamped to a fixed two-line box to keep names aligned
                across a row. The full role is shown on the profile page. */}
            <p className="text-card-accent dark:text-card-accent-soft line-clamp-2 min-h-9 text-[13px] leading-[1.35] font-extrabold tracking-[0.08em] uppercase">
              {t(trainer.role)}
            </p>
            {typeof trainer.rating === 'number' && (
              <span className="bg-card-chip inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-sm font-bold text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50">
                <Star className="fill-card-star text-card-star size-3.5" aria-hidden />
                {trainer.rating.toFixed(1)}
              </span>
            )}
          </div>

          <h3 className="mt-2 line-clamp-2 min-h-15 text-2xl leading-tight font-extrabold text-neutral-900 dark:text-neutral-50">
            {name}
          </h3>

          {trainer.qualifications && (
            <p className="mt-2 flex items-start gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
              <BadgeCheck className="mt-0.5 size-4 shrink-0" role="img" aria-label={t('card.verified')} />
              <span className="line-clamp-2">{t(trainer.qualifications)}</span>
            </p>
          )}

          {trainer.experience && (
            <div className="mt-5 border-t border-neutral-200 pt-4 dark:border-neutral-800">
              <p className="text-xl font-extrabold text-neutral-900 dark:text-neutral-50">
                {t(trainer.experience)}
              </p>
              <p className="mt-0.5 text-[11px] font-semibold tracking-[0.1em] text-neutral-400 uppercase">
                {t('card.experienceLabel')}
              </p>
            </div>
          )}

          <div className="mt-auto border-t border-neutral-200 pt-4 dark:border-neutral-800">
            <span className="bg-card-cta hover:bg-card-cta-hover inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-bold text-white transition-colors">
              {t('viewProfile')}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
