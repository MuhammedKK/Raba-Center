import { useTranslation } from 'react-i18next'
import { PageScaffold } from '@/shared/components/composed/PageScaffold'

export default function TrainersPage() {
  const { t } = useTranslation()
  return <PageScaffold title={t('nav.trainers')} phaseLabel="Phase 5" />
}
