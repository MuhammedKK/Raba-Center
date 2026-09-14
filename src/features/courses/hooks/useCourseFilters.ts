import { useSearchParams } from 'react-router'
import type { CourseFilters } from '@/features/courses/courses.types'

export function useCourseFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const category = searchParams.get('category') ?? 'all'
  const maxPriceParam = searchParams.get('maxPrice')
  const maxPrice = maxPriceParam ? Number(maxPriceParam) : undefined

  function setCategory(next: string) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)
      if (next === 'all') params.delete('category')
      else params.set('category', next)
      return params
    })
  }

  function setMaxPrice(next: number | undefined) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)
      if (next === undefined) params.delete('maxPrice')
      else params.set('maxPrice', String(next))
      return params
    })
  }

  const filters: CourseFilters = { category, maxPrice }

  return { filters, setCategory, setMaxPrice }
}
