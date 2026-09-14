import type { Course, CourseFilters } from '@/features/courses/courses.types'

export function filterCourses(courses: Course[], filters: CourseFilters): Course[] {
  return courses.filter((course) => {
    if (filters.category && filters.category !== 'all' && course.category !== filters.category) {
      return false
    }
    if (filters.maxPrice !== undefined && course.price > filters.maxPrice) {
      return false
    }
    return true
  })
}
