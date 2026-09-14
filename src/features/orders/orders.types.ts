export interface OrderLineItem {
  courseId: string
  quantity: number
  /** Price per unit at the moment of purchase (after any discount), in the store's base currency. */
  unitPrice: number
}

export interface Order {
  id: string
  items: OrderLineItem[]
  total: number
  address: string
  createdAt: string
}
