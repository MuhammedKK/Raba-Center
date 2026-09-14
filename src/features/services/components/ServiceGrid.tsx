import { useTranslation } from 'react-i18next'
import { ServiceCard } from './ServiceCard'
import type { Service } from '@/features/services/services.types'
import { AnimatedSection } from '@/shared/components/composed/AnimatedSection'
import { SectionHeading } from '@/shared/components/composed/SectionHeading'

export function ServiceGrid({ services }: { services: Service[] }) {
  const { t } = useTranslation('services')

  if (services.length === 0) return null

  return (
    <AnimatedSection className="bg-white/50 py-20 backdrop-blur-sm dark:bg-neutral-950/50" id="services">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading align="center" eyebrow={t('grid.eyebrow')} title={t('grid.title')} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
