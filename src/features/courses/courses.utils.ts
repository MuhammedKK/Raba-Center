import type { Course, CourseFilters } from '@/features/courses/courses.types'
import { offersData } from '@/mocks/data/offers.data'

export function getCourseDiscountPercent(courseId: string): number | undefined {
  return offersData.find(
    (offer) => offer.link.type === 'course' && offer.link.courseId === courseId,
  )?.discountPercent
}

export function getDiscountedPrice(course: Course): number {
  const percent = getCourseDiscountPercent(course.id)
  return percent ? Math.round(course.price * (1 - percent / 100)) : course.price
}

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
