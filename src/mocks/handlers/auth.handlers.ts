import { http, HttpResponse } from 'msw'
import { seededUser } from '@/mocks/data/users.data'

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string }

    if (body.email === seededUser.email && body.password === seededUser.password) {
      return HttpResponse.json({ user: { name: seededUser.name, email: seededUser.email } })
    }

    return new HttpResponse(null, { status: 401 })
  }),
]
