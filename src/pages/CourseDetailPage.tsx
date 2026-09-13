import { useParams } from 'react-router'
import { PageScaffold } from '@/shared/components/composed/PageScaffold'

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  return <PageScaffold title={slug ?? ''} phaseLabel="Phase 5" />
}
