import { useTranslation } from 'react-i18next'
import { PageScaffold } from '@/shared/components/composed/PageScaffold'

export default function HomePage() {
  const { t } = useTranslation()
  return <PageScaffold title={t('nav.home')} phaseLabel="Phase 2" />
}
