import { beforeEach, describe, expect, it } from 'vitest'
import { useFavoritesStore } from './useFavoritesStore'

describe('useFavoritesStore', () => {
  beforeEach(() => {
    localStorage.clear()
    useFavoritesStore.setState({ ids: [] })
  })

  it('starts with no favorites', () => {
    expect(useFavoritesStore.getState().ids).toEqual([])
    expect(useFavoritesStore.getState().isFavorite('course-1')).toBe(false)
  })

  it('adds an id on toggle', () => {
    useFavoritesStore.getState().toggleFavorite('course-1')
    expect(useFavoritesStore.getState().ids).toEqual(['course-1'])
    expect(useFavoritesStore.getState().isFavorite('course-1')).toBe(true)
  })

  it('removes an id on a second toggle', () => {
    useFavoritesStore.getState().toggleFavorite('course-1')
    useFavoritesStore.getState().toggleFavorite('course-1')
    expect(useFavoritesStore.getState().ids).toEqual([])
    expect(useFavoritesStore.getState().isFavorite('course-1')).toBe(false)
  })

  it('tracks multiple ids independently', () => {
    useFavoritesStore.getState().toggleFavorite('course-1')
    useFavoritesStore.getState().toggleFavorite('course-2')
    useFavoritesStore.getState().toggleFavorite('course-1')

    const state = useFavoritesStore.getState()
    expect(state.ids).toEqual(['course-2'])
    expect(state.isFavorite('course-1')).toBe(false)
    expect(state.isFavorite('course-2')).toBe(true)
  })

  it('persists to localStorage under its store key so favorites survive a reload', () => {
    useFavoritesStore.getState().toggleFavorite('course-1')
    const stored = localStorage.getItem('raba-center-favorites')
    expect(stored).not.toBeNull()
    expect(JSON.parse(stored ?? '{}').state.ids).toEqual(['course-1'])
  })
})
