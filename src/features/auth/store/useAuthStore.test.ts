import { beforeEach, describe, expect, it } from 'vitest'
import { useAuthStore } from './useAuthStore'
import { useCartStore } from '@/features/cart/store/useCartStore'
import { useFavoritesStore } from '@/features/favorites/store/useFavoritesStore'
import { seededUser } from '@/mocks/data/users.data'

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ isAuthenticated: false, user: null })
    useCartStore.setState({ items: [] })
    useFavoritesStore.setState({ ids: [] })
  })

  it('starts signed out', () => {
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
    expect(useAuthStore.getState().user).toBeNull()
  })

  it('logs in successfully against the seeded user', async () => {
    const success = await useAuthStore.getState().login(seededUser.email, seededUser.password)

    expect(success).toBe(true)
    expect(useAuthStore.getState().isAuthenticated).toBe(true)
    expect(useAuthStore.getState().user).toEqual({
      name: seededUser.name,
      email: seededUser.email,
    })
  })

  it('rejects an incorrect password', async () => {
    const success = await useAuthStore.getState().login(seededUser.email, 'wrong-password')

    expect(success).toBe(false)
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
    expect(useAuthStore.getState().user).toBeNull()
  })

  it('rejects an unknown email', async () => {
    const success = await useAuthStore.getState().login('nobody@example.com', 'whatever')
    expect(success).toBe(false)
  })

  it('logs out and clears the user', async () => {
    await useAuthStore.getState().login(seededUser.email, seededUser.password)
    useAuthStore.getState().logout()

    expect(useAuthStore.getState().isAuthenticated).toBe(false)
    expect(useAuthStore.getState().user).toBeNull()
  })

  it('preserves favorites and cart state added while signed out, across login (single shared store — no merge step needed)', async () => {
    useFavoritesStore.getState().toggleFavorite('course-1')
    useCartStore.getState().addItem('course-2')

    await useAuthStore.getState().login(seededUser.email, seededUser.password)

    expect(useFavoritesStore.getState().isFavorite('course-1')).toBe(true)
    expect(useCartStore.getState().items).toEqual([{ courseId: 'course-2', quantity: 1 }])
  })
})
