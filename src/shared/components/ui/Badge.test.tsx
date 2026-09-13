import { describe, expect, it } from 'vitest'
import { Badge } from './Badge'
import { renderWithProviders, screen } from '@/test/test-utils'

describe('Badge', () => {
  it('renders its content', () => {
    renderWithProviders(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('applies tone-specific styling', () => {
    renderWithProviders(<Badge tone="success">Available</Badge>)
    expect(screen.getByText('Available')).toHaveClass('text-success-500')
  })
})
