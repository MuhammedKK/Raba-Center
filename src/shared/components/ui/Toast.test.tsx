import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ToastProvider, useToast } from './Toast'
import { renderWithProviders, screen, waitFor } from '@/test/test-utils'

function ToastTrigger() {
  const { showToast } = useToast()
  return (
    <button type="button" onClick={() => showToast('Message sent', 'success')}>
      Trigger
    </button>
  )
}

describe('Toast', () => {
  it('shows a toast message when triggered', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Trigger' }))
    expect(await screen.findByRole('status')).toHaveTextContent('Message sent')
  })

  it('dismisses a toast when its close button is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Trigger' }))
    const toast = await screen.findByRole('status')
    await user.click(toast.querySelector('button')!)
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument())
  })

  it('throws when useToast is used outside of <ToastProvider>', () => {
    function Bare() {
      useToast()
      return null
    }
    expect(() => renderWithProviders(<Bare />)).toThrow(
      'useToast must be used within <ToastProvider>',
    )
  })
})
