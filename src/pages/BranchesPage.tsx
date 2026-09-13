import { useTranslation } from 'react-i18next'
import { PageScaffold } from '@/shared/components/composed/PageScaffold'

export default function BranchesPage() {
  const { t } = useTranslation()
  return <PageScaffold title={t('nav.branches')} phaseLabel="Phase 6" />
}
