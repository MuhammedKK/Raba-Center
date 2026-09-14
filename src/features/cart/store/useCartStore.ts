import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/features/cart/cart.types'

interface CartState {
  items: CartItem[]
  addItem: (courseId: string) => void
  removeItem: (courseId: string) => void
  setQuantity: (courseId: string, quantity: number) => void
  clear: () => void
}

// Persisted the same way as useFavoritesStore: a single global store, not
// scoped per user id. That means anything added while signed out is already
// present after login — there's no separate guest/user cart to merge.
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (courseId) =>
        set((state) => {
          const existing = state.items.find((item) => item.courseId === courseId)
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.courseId === courseId ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            }
          }
          return { items: [...state.items, { courseId, quantity: 1 }] }
        }),
      removeItem: (courseId) =>
        set((state) => ({ items: state.items.filter((item) => item.courseId !== courseId) })),
      setQuantity: (courseId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.courseId !== courseId)
              : state.items.map((item) =>
                  item.courseId === courseId ? { ...item, quantity } : item,
                ),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: 'raba-center-cart' },
  ),
)
