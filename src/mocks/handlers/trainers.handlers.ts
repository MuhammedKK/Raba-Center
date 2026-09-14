import { http, HttpResponse } from 'msw'
import { trainersData } from '@/mocks/data/trainers.data'

export const trainersHandlers = [
  http.get('/api/trainers', () => HttpResponse.json(trainersData)),
  http.get('/api/trainers/:slug', ({ params }) => {
    const trainer = trainersData.find((item) => item.slug === params.slug)
    if (!trainer) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(trainer)
  }),
]
