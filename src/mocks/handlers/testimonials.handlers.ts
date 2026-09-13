import { http, HttpResponse } from 'msw'
import { testimonialsData } from '@/mocks/data/testimonials.data'

export const testimonialsHandlers = [
  http.get('/api/testimonials', () => HttpResponse.json(testimonialsData)),
]
