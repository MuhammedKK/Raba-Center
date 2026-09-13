import { describe, expect, it } from 'vitest'
import { Skeleton } from './Skeleton'
import { renderWithProviders } from '@/test/test-utils'

describe('Skeleton', () => {
  it('renders as a decorative, non-content element', () => {
    const { container } = renderWithProviders(<Skeleton className="h-4 w-full" />)
    const skeleton = container.firstChild as HTMLElement
    expect(skeleton).toHaveAttribute('aria-hidden')
    expect(skeleton).toHaveClass('animate-pulse')
  })
})
