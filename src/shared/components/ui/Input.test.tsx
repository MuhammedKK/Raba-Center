import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Input } from './Input'
import { renderWithProviders, screen } from '@/test/test-utils'

describe('Input', () => {
  it('associates the label with the input via htmlFor/id', () => {
    renderWithProviders(<Input label="Full name" />)
    expect(screen.getByLabelText('Full name')).toBeInTheDocument()
  })

  it('accepts typed input', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Input label="Full name" />)
    const input = screen.getByLabelText('Full name')
    await user.type(input, 'Amal')
    expect(input).toHaveValue('Amal')
  })

  it('shows an accessible error message and marks the field invalid', () => {
    renderWithProviders(<Input label="Email" error="Email is required" />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('alert')).toHaveTextContent('Email is required')
  })
})
