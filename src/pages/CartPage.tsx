import { useTranslation } from 'react-i18next'
import { PageScaffold } from '@/shared/components/composed/PageScaffold'

export default function CartPage() {
  const { t } = useTranslation()
  return <PageScaffold title={t('account.cart')} phaseLabel="Phase 9" />
}
