import { http, HttpResponse } from 'msw'
import { coursesData } from '@/mocks/data/courses.data'

export const coursesHandlers = [
  http.get('/api/courses', ({ request }) => {
    const url = new URL(request.url)
    const featured = url.searchParams.get('featured')
    const items = featured ? coursesData.slice(0, 3) : coursesData
    return HttpResponse.json(items)
  }),
  http.get('/api/courses/:slug', ({ params }) => {
    const course = coursesData.find((item) => item.slug === params.slug)
    if (!course) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(course)
  }),
]
