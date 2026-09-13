import { useEffect, useState } from 'react'
import { coursesApi } from '@/api/endpoints/courses.api'
import type { Course } from '@/features/courses/courses.types'

export function useCourses(options?: { featured?: boolean }) {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    // Fetch-on-mount/dep-change with no query library in this stack (see PLAN.md);
    // resetting isLoading here is intentional, not the "derived state" anti-pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true)

    coursesApi
      .getCourses(options)
      .then((data) => {
        if (!cancelled) setCourses(data)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.featured])

  return { courses, isLoading }
}
