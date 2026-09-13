import { useTranslation } from 'react-i18next'
import { PageScaffold } from '@/shared/components/composed/PageScaffold'

export default function LoginPage() {
  const { t } = useTranslation()
  return <PageScaffold title={t('account.login')} phaseLabel="Phase 9" />
}
