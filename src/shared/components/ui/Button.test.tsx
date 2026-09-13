import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'
import { renderWithProviders, screen } from '@/test/test-utils'

describe('Button', () => {
  it('renders its label', () => {
    renderWithProviders(<Button>Book now</Button>)
    expect(screen.getByRole('button', { name: 'Book now' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    renderWithProviders(<Button onClick={onClick}>Click me</Button>)
    await user.click(screen.getByRole('button', { name: 'Click me' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('disables interaction while loading', () => {
    renderWithProviders(<Button isLoading>Loading</Button>)
    expect(screen.getByRole('button', { name: 'Loading' })).toBeDisabled()
  })
})
