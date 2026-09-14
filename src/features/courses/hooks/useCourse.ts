import { useEffect, useState } from 'react'
import { coursesApi } from '@/api/endpoints/courses.api'
import type { Course } from '@/features/courses/courses.types'

export function useCourse(slug: string | undefined) {
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    // Fetch-on-mount/dep-change with no query library in this stack (see PLAN.md);
    // resetting these here is intentional, not the "derived state" anti-pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true)
    setNotFound(false)

    coursesApi
      .getCourseBySlug(slug)
      .then((data) => {
        if (!cancelled) setCourse(data)
      })
      .catch(() => {
        if (!cancelled) setNotFound(true)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return { course, isLoading, notFound }
}
