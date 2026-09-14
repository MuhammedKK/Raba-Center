import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { OfferCard } from './OfferCard'
import type { Offer } from '@/features/home/home.types'
import { AnimatedSection } from '@/shared/components/composed/AnimatedSection'
import { SectionHeading } from '@/shared/components/composed/SectionHeading'

export function OffersCarousel({ offers }: { offers: Offer[] }) {
  const { t } = useTranslation('home')

  if (offers.length === 0) return null

  return (
    <AnimatedSection className="bg-white/50 py-20 backdrop-blur-sm dark:bg-neutral-950/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={t('offers.eyebrow')} title={t('offers.title')} />
        <div className="flex snap-x snap-mandatory scrollbar-none gap-5 overflow-x-auto pb-4">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <OfferCard offer={offer} />
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
