import { beforeEach, describe, expect, it } from 'vitest'
import { useCartStore } from './useCartStore'

describe('useCartStore', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] })
  })

  it('starts empty', () => {
    expect(useCartStore.getState().items).toEqual([])
  })

  it('adds a new item with quantity 1', () => {
    useCartStore.getState().addItem('course-1')
    expect(useCartStore.getState().items).toEqual([{ courseId: 'course-1', quantity: 1 }])
  })

  it('increments quantity when adding an existing item', () => {
    useCartStore.getState().addItem('course-1')
    useCartStore.getState().addItem('course-1')
    expect(useCartStore.getState().items).toEqual([{ courseId: 'course-1', quantity: 2 }])
  })

  it('sets an explicit quantity', () => {
    useCartStore.getState().addItem('course-1')
    useCartStore.getState().setQuantity('course-1', 5)
    expect(useCartStore.getState().items).toEqual([{ courseId: 'course-1', quantity: 5 }])
  })

  it('removes the item when quantity is set to zero or below', () => {
    useCartStore.getState().addItem('course-1')
    useCartStore.getState().setQuantity('course-1', 0)
    expect(useCartStore.getState().items).toEqual([])
  })

  it('removes an item explicitly', () => {
    useCartStore.getState().addItem('course-1')
    useCartStore.getState().addItem('course-2')
    useCartStore.getState().removeItem('course-1')
    expect(useCartStore.getState().items).toEqual([{ courseId: 'course-2', quantity: 1 }])
  })

  it('clears all items', () => {
    useCartStore.getState().addItem('course-1')
    useCartStore.getState().addItem('course-2')
    useCartStore.getState().clear()
    expect(useCartStore.getState().items).toEqual([])
  })
})
