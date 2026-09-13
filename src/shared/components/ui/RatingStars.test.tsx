import { describe, expect, it } from 'vitest'
import { RatingStars } from './RatingStars'
import { renderWithProviders, screen } from '@/test/test-utils'

describe('RatingStars', () => {
  it('exposes the rating via an accessible label', () => {
    renderWithProviders(<RatingStars value={4} />)
    expect(screen.getByRole('img', { name: '4 / 5' })).toBeInTheDocument()
  })

  it('respects a custom max', () => {
    renderWithProviders(<RatingStars value={7} max={10} />)
    expect(screen.getByRole('img', { name: '7 / 10' })).toBeInTheDocument()
  })
})
