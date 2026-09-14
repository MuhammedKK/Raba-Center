export interface CartItem {
  courseId: string
  quantity: number
}

export interface CheckoutPayload {
  items: CartItem[]
  address: string
  cardNumber: string
}

export interface CheckoutResponse {
  success: true
  orderId: string
}
