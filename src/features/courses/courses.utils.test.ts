import { describe, expect, it } from 'vitest'
import { filterCourses } from './courses.utils'
import type { Course } from '@/features/courses/courses.types'

const courses: Course[] = [
  {
    id: 'c1',
    slug: 'aba-technician',
    title: 'ABA Technician',
    description: '',
    category: 'aba',
    price: 350,
    rating: 4.5,
    reviewCount: 10,
    durationHours: 40,
    image: 'aba',
    trainerId: 't1',
    curriculum: [],
  },
  {
    id: 'c2',
    slug: 'speech-foundations',
    title: 'Speech Foundations',
    description: '',
    category: 'speech',
    price: 650,
    rating: 4.6,
    reviewCount: 20,
    durationHours: 32,
    image: 'speech',
    trainerId: 't2',
    curriculum: [],
  },
  {
    id: 'c3',
    slug: 'behavior-specialist',
    title: 'Behavior Specialist',
    description: '',
    category: 'aba',
    price: 5000,
    rating: 4.9,
    reviewCount: 30,
    durationHours: 120,
    image: 'specialist',
    trainerId: 't1',
    curriculum: [],
  },
]

describe('filterCourses', () => {
  it('returns every course when no filters are set', () => {
    expect(filterCourses(courses, {})).toHaveLength(3)
  })

  it('returns every course when category is "all"', () => {
    expect(filterCourses(courses, { category: 'all' })).toHaveLength(3)
  })

  it('filters by category', () => {
    const result = filterCourses(courses, { category: 'speech' })
    expect(result).toEqual([courses[1]])
  })

  it('filters by max price', () => {
    const result = filterCourses(courses, { maxPrice: 650 })
    expect(result.map((course) => course.id)).toEqual(['c1', 'c2'])
  })

  it('combines category and max price filters', () => {
    const result = filterCourses(courses, { category: 'aba', maxPrice: 1000 })
    expect(result).toEqual([courses[0]])
  })

  it('returns an empty list when nothing matches', () => {
    expect(filterCourses(courses, { category: 'aba', maxPrice: 100 })).toEqual([])
  })
})
