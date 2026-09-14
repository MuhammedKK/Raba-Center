import { describe, expect, it } from 'vitest'
import { AnimatedStatsCounter } from './AnimatedStatsCounter'
import { renderWithProviders, screen } from '@/test/test-utils'

describe('AnimatedStatsCounter', () => {
  it('renders the label and starts at 0 before scrolling into view', () => {
    renderWithProviders(<AnimatedStatsCounter value={92} label="Parent satisfaction" />)
    expect(screen.getByText('Parent satisfaction')).toBeInTheDocument()
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  it('renders a custom suffix', () => {
    renderWithProviders(
      <AnimatedStatsCounter value={30} suffix="+" label="Certified specialists" />,
    )
    expect(screen.getByText('0+')).toBeInTheDocument()
  })
})
