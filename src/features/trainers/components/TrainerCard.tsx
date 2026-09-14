import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import ahmedImage from '@/assets/images/trainers/ahmed-abu-zaid.png'
import dohaImage from '@/assets/images/trainers/doha-khaled.png'
import hanaaImage from '@/assets/images/trainers/hanaa-bashir.png'
import hishamImage from '@/assets/images/trainers/hisham-salama.png'
import type { Trainer } from '@/features/trainers/trainers.types'
import { Card, RatingStars } from '@/shared/components/ui'

const imageByTrainer: Record<Trainer['photo'], string> = {
  hanaa: hanaaImage,
  ahmed: ahmedImage,
  hisham: hishamImage,
  doha: dohaImage,
}

export function TrainerCard({ trainer }: { trainer: Trainer }) {
  const { t } = useTranslation('trainers')
  const { locale } = useParams<{ locale: string }>()

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <Link to={`/${locale}/trainers/${trainer.slug}`}>
        <Card className="h-full">
          <Card.Media>
            <img
              src={imageByTrainer[trainer.photo]}
              alt=""
              aria-hidden
              className="size-full object-cover"
              loading="lazy"
            />
          </Card.Media>
          <Card.Body>
            <h3 className="font-bold text-neutral-900 dark:text-neutral-50">{t(trainer.name)}</h3>
            <p className="text-primary-700 dark:text-primary-300 mt-1 text-sm font-semibold">
              {t(trainer.role)}
            </p>
            {typeof trainer.rating === 'number' && (
              <RatingStars value={trainer.rating} className="mt-2" />
            )}
            <p className="mt-2 line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400">
              {t(trainer.bio)}
            </p>
            <span className="text-primary-600 dark:text-primary-400 mt-4 inline-block text-sm font-semibold hover:underline">
              {t('viewProfile')}
            </span>
          </Card.Body>
        </Card>
      </Link>
    </motion.div>
  )
}
