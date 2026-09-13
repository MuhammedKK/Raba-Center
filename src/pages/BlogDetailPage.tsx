import { useParams } from 'react-router'
import { PageScaffold } from '@/shared/components/composed/PageScaffold'

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  return <PageScaffold title={slug ?? ''} phaseLabel="Phase 7" />
}
