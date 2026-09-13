import { useTranslation } from 'react-i18next'
import { PageScaffold } from '@/shared/components/composed/PageScaffold'

export default function AboutPage() {
  const { t } = useTranslation()
  return <PageScaffold title={t('nav.about')} phaseLabel="Phase 3" />
}
