import { apiClient } from '@/api/client'
import type { CheckoutPayload, CheckoutResponse } from '@/features/cart/cart.types'

export const cartApi = {
  placeOrder: (payload: CheckoutPayload) =>
    apiClient.post<CheckoutResponse>('/cart/checkout', payload),
}
