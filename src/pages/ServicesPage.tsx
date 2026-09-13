import { useTranslation } from 'react-i18next'
import { PageScaffold } from '@/shared/components/composed/PageScaffold'

export default function ServicesPage() {
  const { t } = useTranslation()
  return <PageScaffold title={t('nav.services')} phaseLabel="Phase 4" />
}
