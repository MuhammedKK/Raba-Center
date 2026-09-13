import { apiClient } from '@/api/client'
import type { Testimonial } from '@/features/home/home.types'

export const testimonialsApi = {
  getTestimonials: () => apiClient.get<Testimonial[]>('/testimonials'),
}
