import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import behaviorImage from '@/assets/images/team/team-behavior.jpg'
import leadImage from '@/assets/images/team/team-lead.jpg'
import occupationalImage from '@/assets/images/team/team-occupational.jpg'
import speechImage from '@/assets/images/team/team-speech.jpg'
import { useTrainer } from '@/features/trainers/hooks/useTrainer'
import type { Trainer } from '@/features/trainers/trainers.types'
import { Skeleton } from '@/shared/components/ui'

const imageByTrainer: Record<Trainer['photo'], string> = {
  lead: leadImage,
  behavior: behaviorImage,
  speech: speechImage,
  occupational: occupationalImage,
}

export default function TrainerDetailPage() {
  const { t } = useTranslation('trainers')
  const { slug, locale = 'ar' } = useParams<{ slug: string; locale: string }>()
  const { trainer, isLoading, notFound } = useTrainer(slug)

  if (notFound) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-neutral-900">{t('detail.notFound')}</h1>
        <Link
          to={`/${locale}/trainers`}
          className="text-primary-600 mt-4 inline-block font-semibold"
        >
          {t('list.eyebrow')}
        </Link>
      </div>
    )
  }

  if (isLoading || !trainer) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Skeleton className="h-72 w-full" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-start">
        <img
          src={imageByTrainer[trainer.photo]}
          alt=""
          aria-hidden
          className="size-32 shrink-0 rounded-2xl object-cover"
        />
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-900">{t(trainer.name)}</h1>
          <p className="text-primary-700 mt-1 font-semibold">{t(trainer.role)}</p>
          <p className="mt-1 text-sm text-neutral-500">{t(trainer.credentials)}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-bold text-neutral-900">{t(trainer.specialty)}</h2>
        <p className="mt-3 text-neutral-700">{t(trainer.bio)}</p>
      </div>
    </div>
  )
}
