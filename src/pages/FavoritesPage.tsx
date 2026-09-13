import { useTranslation } from 'react-i18next'
import { PageScaffold } from '@/shared/components/composed/PageScaffold'

export default function FavoritesPage() {
  const { t } = useTranslation()
  return <PageScaffold title={t('account.favorites')} phaseLabel="Phase 9" />
}
