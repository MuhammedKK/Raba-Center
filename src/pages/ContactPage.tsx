import { useTranslation } from 'react-i18next'
import { PageScaffold } from '@/shared/components/composed/PageScaffold'

export default function ContactPage() {
  const { t } = useTranslation()
  return <PageScaffold title={t('nav.contact')} phaseLabel="Phase 8" />
}
