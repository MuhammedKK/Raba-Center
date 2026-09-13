import { describe, expect, it } from 'vitest'
import { Card } from './Card'
import { renderWithProviders, screen } from '@/test/test-utils'

describe('Card', () => {
  it('renders composed Media/Body/Footer sections', () => {
    renderWithProviders(
      <Card>
        <Card.Media data-testid="media" />
        <Card.Body>Body content</Card.Body>
        <Card.Footer>Footer content</Card.Footer>
      </Card>,
    )

    expect(screen.getByTestId('media')).toBeInTheDocument()
    expect(screen.getByText('Body content')).toBeInTheDocument()
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('merges a custom className with its base styles', () => {
    renderWithProviders(<Card data-testid="card" className="custom-class" />)
    expect(screen.getByTestId('card')).toHaveClass('custom-class')
    expect(screen.getByTestId('card')).toHaveClass('rounded-2xl')
  })
})
