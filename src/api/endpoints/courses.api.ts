import { apiClient } from '@/api/client'
import type { Course } from '@/features/courses/courses.types'

export const coursesApi = {
  getCourses: (options?: { featured?: boolean }) =>
    apiClient.get<Course[]>(options?.featured ? '/courses?featured=1' : '/courses'),
  getCourseBySlug: (slug: string) => apiClient.get<Course>(`/courses/${slug}`),
}
