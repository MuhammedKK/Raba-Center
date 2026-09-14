import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { Accreditation } from '@/features/home/home.types'
import { AnimatedSection } from '@/shared/components/composed/AnimatedSection'
import { CredentialBadge } from '@/shared/components/composed/CredentialBadge'
import { SectionHeading } from '@/shared/components/composed/SectionHeading'
import { useScrollReveal } from '@/shared/hooks/useScrollReveal'

export function AccreditationsSection({ accreditations }: { accreditations: Accreditation[] }) {
  const { t } = useTranslation('home')
  const { ref, isInView } = useScrollReveal()

  if (accreditations.length === 0) return null

  return (
    <AnimatedSection className="bg-neutral-50/50 py-20 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          align="center"
          eyebrow={t('accreditations.eyebrow')}
          title={t('accreditations.title')}
        />
        <div ref={ref} className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {accreditations.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <CredentialBadge {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
