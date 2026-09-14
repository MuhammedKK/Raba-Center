import { http, HttpResponse } from 'msw'

export const cartHandlers = [
  http.post('/api/cart/checkout', async () =>
    HttpResponse.json({ success: true, orderId: crypto.randomUUID() }, { status: 201 }),
  ),
]
