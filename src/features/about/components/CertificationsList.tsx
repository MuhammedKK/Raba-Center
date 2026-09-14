import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { ValueItem } from '@/features/about/about.types'
import type { Accreditation } from '@/features/home/home.types'
import { AnimatedSection } from '@/shared/components/composed/AnimatedSection'
import { CredentialBadge } from '@/shared/components/composed/CredentialBadge'
import { SectionHeading } from '@/shared/components/composed/SectionHeading'
import { useScrollReveal } from '@/shared/hooks/useScrollReveal'

export function CertificationsList({
  certifications,
  values,
}: {
  certifications: Accreditation[]
  values: ValueItem[]
}) {
  const { t } = useTranslation('about')
  const { ref, isInView } = useScrollReveal()

  return (
    <AnimatedSection className="bg-neutral-50/50 py-20 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading align="center" eyebrow={t('values.eyebrow')} title={t('values.title')} />

        {certifications.length > 0 && (
          <div
            ref={ref}
            className="mb-14 flex flex-wrap items-center justify-center gap-x-12 gap-y-8"
          >
            {certifications.map((item, index) => (
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
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.id} className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="font-bold text-neutral-900">{t(value.title)}</h3>
              <p className="mt-2 text-sm text-neutral-700">{t(value.description)}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
