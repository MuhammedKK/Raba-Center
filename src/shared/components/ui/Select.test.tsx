import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Select } from './Select'
import { renderWithProviders, screen } from '@/test/test-utils'

const options = [
  { value: 'aba', label: 'ABA Therapy' },
  { value: 'speech', label: 'Speech Therapy' },
]

describe('Select', () => {
  it('renders every option', () => {
    renderWithProviders(<Select label="Service" options={options} />)
    expect(screen.getByRole('option', { name: 'ABA Therapy' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Speech Therapy' })).toBeInTheDocument()
  })

  it('updates the selected value', async () => {
    const user = userEvent.setup()
    renderWithProviders(<Select label="Service" options={options} />)
    const select = screen.getByLabelText('Service')
    await user.selectOptions(select, 'speech')
    expect(select).toHaveValue('speech')
  })
})
