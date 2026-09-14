import { http, HttpResponse } from 'msw'

function mockSubmitHandler(path: string) {
  return http.post(path, async () =>
    HttpResponse.json({ success: true, referenceId: crypto.randomUUID() }, { status: 201 }),
  )
}

export const contactHandlers = [
  mockSubmitHandler('/api/contact/inquiry'),
  mockSubmitHandler('/api/contact/home-service'),
  mockSubmitHandler('/api/contact/shadow-teacher'),
]
