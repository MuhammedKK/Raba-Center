import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { TrainerCard } from '@/features/trainers/components/TrainerCard'
import { useTrainers } from '@/features/trainers/hooks/useTrainers'
import { SectionHeading } from '@/shared/components/composed/SectionHeading'
import { Spinner } from '@/shared/components/ui'

export default function TrainersPage() {
  const { t } = useTranslation('trainers')
  const { trainers, isLoading } = useTrainers()

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading align="center" eyebrow={t('list.eyebrow')} title={t('list.title')} />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <TrainerCard trainer={trainer} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
