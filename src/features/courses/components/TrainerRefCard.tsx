import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import ahmedImage from '@/assets/images/trainers/ahmed-abu-zaid.jpeg'
import dohaImage from '@/assets/images/trainers/doha-khaled.jpeg'
import hanaaImage from '@/assets/images/trainers/hanaa-bashir.png'
import hishamImage from '@/assets/images/trainers/hisham-salama.png'
import type { Trainer } from '@/features/trainers/trainers.types'

const imageByTrainer: Record<Trainer['photo'], string> = {
  hanaa: hanaaImage,
  ahmed: ahmedImage,
  hisham: hishamImage,
  doha: dohaImage,
}

export function TrainerRefCard({ trainer }: { trainer: Trainer }) {
  const { t } = useTranslation('courses')
  const { locale } = useParams<{ locale: string }>()

  return (
    <Link
      to={`/${locale}/trainers/${trainer.slug}`}
      className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
    >
      <img
        src={imageByTrainer[trainer.photo]}
        alt=""
        aria-hidden
        className="size-14 shrink-0 rounded-full object-cover"
      />
      <div className="text-start">
        <p className="text-xs font-semibold tracking-wide text-neutral-400 uppercase">
          {t('trainer.label')}
        </p>
        <p className="font-bold text-neutral-900 dark:text-neutral-50">{t(trainer.name)}</p>
        <p className="text-primary-600 dark:text-primary-400 text-sm font-medium">
          {t(trainer.role)}
        </p>
      </div>
    </Link>
  )
}
