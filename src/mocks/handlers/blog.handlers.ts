import { http, HttpResponse } from 'msw'
import { blogData } from '@/mocks/data/blog.data'

export const blogHandlers = [
  http.get('/api/blog', () => HttpResponse.json(blogData)),
  http.get('/api/blog/:slug', ({ params }) => {
    const post = blogData.find((item) => item.slug === params.slug)
    if (!post) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(post)
  }),
]
