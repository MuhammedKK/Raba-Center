import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Order } from '@/features/orders/orders.types'

interface OrdersState {
  orders: Order[]
  addOrder: (order: Order) => void
}

// Persisted the same way as useCartStore/useFavoritesStore: a single global
// store, not scoped per user id — fine for this single-demo-account app.
export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
    }),
    { name: 'raba-center-orders' },
  ),
)
