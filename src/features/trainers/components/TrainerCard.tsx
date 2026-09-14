import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import behaviorImage from '@/assets/images/team/team-behavior.jpg'
import leadImage from '@/assets/images/team/team-lead.jpg'
import occupationalImage from '@/assets/images/team/team-occupational.jpg'
import speechImage from '@/assets/images/team/team-speech.jpg'
import type { Trainer } from '@/features/trainers/trainers.types'
import { Card } from '@/shared/components/ui'

const imageByTrainer: Record<Trainer['photo'], string> = {
  lead: leadImage,
  behavior: behaviorImage,
  speech: speechImage,
  occupational: occupationalImage,
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
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              {t(trainer.credentials)}
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
