import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import ahmedImage from '@/assets/images/trainers/ahmed-abu-zaid.jpeg'
import dohaImage from '@/assets/images/trainers/doha-khaled.jpeg'
import hanaaImage from '@/assets/images/trainers/hanaa-bashir.png'
import hishamImage from '@/assets/images/trainers/hisham-salama.png'
import { useTrainer } from '@/features/trainers/hooks/useTrainer'
import type { Trainer } from '@/features/trainers/trainers.types'
import NotFoundPage from '@/pages/NotFoundPage'
import { Button, RatingStars, Spinner } from '@/shared/components/ui'

const imageByTrainer: Record<Trainer['photo'], string> = {
  hanaa: hanaaImage,
  ahmed: ahmedImage,
  hisham: hishamImage,
  doha: dohaImage,
}

export default function TrainerDetailPage() {
  const { t } = useTranslation('trainers')
  const { slug, locale = 'ar' } = useParams<{ slug: string; locale: string }>()
  const { trainer, isLoading, notFound } = useTrainer(slug)

  if (notFound) {
    return <NotFoundPage />
  }

  if (isLoading || !trainer) {
    return <Spinner className="py-32" />
  }

  return (
    <motion.div
      className="mx-auto max-w-3xl px-4 py-16 sm:px-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-start">
        <img
          src={imageByTrainer[trainer.photo]}
          alt=""
          aria-hidden
          className="size-32 shrink-0 rounded-2xl object-cover"
        />
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-50">
            {t(trainer.name)}
          </h1>
          <p className="text-primary-700 dark:text-primary-300 mt-1 font-semibold">
            {t(trainer.role)}
          </p>
          {typeof trainer.rating === 'number' && (
            <div className="mt-2 flex items-center justify-center gap-2 sm:justify-start">
              <RatingStars value={trainer.rating} />
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {trainer.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-8">
        <section>
          <h2 className="font-bold text-neutral-900 dark:text-neutral-50">{t('detail.about')}</h2>
          <p className="mt-3 text-neutral-700 dark:text-neutral-400">{t(trainer.bio)}</p>
        </section>

        {trainer.qualifications && (
          <section>
            <h2 className="font-bold text-neutral-900 dark:text-neutral-50">
              {t('detail.qualifications')}
            </h2>
            <p className="mt-3 text-neutral-700 dark:text-neutral-400">
              {t(trainer.qualifications)}
            </p>
          </section>
        )}

        {trainer.experience && (
          <section>
            <h2 className="font-bold text-neutral-900 dark:text-neutral-50">
              {t('detail.experience')}
            </h2>
            <p className="mt-3 text-neutral-700 dark:text-neutral-400">{t(trainer.experience)}</p>
          </section>
        )}
      </div>

      <div className="mt-12 flex justify-center sm:justify-start">
        <Link to={`/${locale}/contact?trainer=${trainer.slug}`}>
          <Button size="lg">{t('detail.registerCta')}</Button>
        </Link>
      </div>
    </motion.div>
  )
}
