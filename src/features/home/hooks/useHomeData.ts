import { useEffect, useState } from 'react'
import { accreditationsApi } from '@/api/endpoints/accreditations.api'
import { coursesApi } from '@/api/endpoints/courses.api'
import { offersApi } from '@/api/endpoints/offers.api'
import { statsApi } from '@/api/endpoints/stats.api'
import { testimonialsApi } from '@/api/endpoints/testimonials.api'
import { trainersApi } from '@/api/endpoints/trainers.api'
import type { Course } from '@/features/courses/courses.types'
import type { Accreditation, Offer, Testimonial } from '@/features/home/home.types'
import type { Trainer } from '@/features/trainers/trainers.types'
import type { OrgStat } from '@/mocks/data/stats.data'

interface HomeData {
  stats: OrgStat[]
  offers: Offer[]
  featuredCourses: Course[]
  testimonials: Testimonial[]
  credentials: Accreditation[]
  accreditations: Accreditation[]
  trainers: Trainer[]
}

const emptyState: HomeData = {
  stats: [],
  offers: [],
  featuredCourses: [],
  testimonials: [],
  credentials: [],
  accreditations: [],
  trainers: [],
}

export function useHomeData() {
  const [data, setData] = useState<HomeData>(emptyState)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    Promise.all([
      statsApi.getStats(),
      offersApi.getOffers(),
      coursesApi.getCourses({ featured: true }),
      testimonialsApi.getTestimonials(),
      accreditationsApi.getCredentials(),
      accreditationsApi.getAccreditations(),
      trainersApi.getTrainers(),
    ])
      .then(
        ([stats, offers, featuredCourses, testimonials, credentials, accreditations, trainers]) => {
          if (cancelled) return
          setData({ stats, offers, featuredCourses, testimonials, credentials, accreditations, trainers })
        },
      )
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { ...data, isLoading }
}
