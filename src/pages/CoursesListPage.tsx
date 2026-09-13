import { useTranslation } from 'react-i18next'
import { PageScaffold } from '@/shared/components/composed/PageScaffold'

export default function CoursesListPage() {
  const { t } = useTranslation()
  return <PageScaffold title={t('nav.courses')} phaseLabel="Phase 5" />
}
