import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { Modal } from './Modal'
import { renderWithProviders, screen, waitFor } from '@/test/test-utils'

function TestModal({ onClose }: { onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false)
        onClose()
      }}
      title="Confirm booking"
    >
      <button type="button">Confirm</button>
    </Modal>
  )
}

describe('Modal', () => {
  it('renders nothing when closed', () => {
    renderWithProviders(
      <Modal isOpen={false} onClose={() => {}} title="Hidden">
        Content
      </Modal>,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders its title and content when open', () => {
    renderWithProviders(
      <Modal isOpen onClose={() => {}} title="Confirm booking">
        Content
      </Modal>,
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Confirm booking')).toBeInTheDocument()
  })

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    renderWithProviders(<TestModal onClose={onClose} />)
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalledOnce()
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('calls onClose on Escape', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    renderWithProviders(<TestModal onClose={onClose} />)
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledOnce()
  })
})
