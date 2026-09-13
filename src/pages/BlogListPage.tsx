import { useTranslation } from 'react-i18next'
import { PageScaffold } from '@/shared/components/composed/PageScaffold'

export default function BlogListPage() {
  const { t } = useTranslation()
  return <PageScaffold title={t('nav.blog')} phaseLabel="Phase 7" />
}
