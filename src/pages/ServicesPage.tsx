import { ServiceCtaBanner } from '@/features/services/components/ServiceCtaBanner'
import { ServiceGrid } from '@/features/services/components/ServiceGrid'
import { ServicesHero } from '@/features/services/components/ServicesHero'
import { useServices } from '@/features/services/hooks/useServices'

export default function ServicesPage() {
  const { services } = useServices()

  return (
    <div>
      <ServicesHero />
      <ServiceGrid services={services} />
      <ServiceCtaBanner />
    </div>
  )
}
