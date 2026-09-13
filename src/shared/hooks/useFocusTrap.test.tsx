import userEvent from '@testing-library/user-event'
import { useRef } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { useFocusTrap } from './useFocusTrap'
import { renderWithProviders, screen } from '@/test/test-utils'

function TestPanel({ isOpen, onEscape }: { isOpen: boolean; onEscape: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useFocusTrap(ref, isOpen, onEscape)

  if (!isOpen) return null
  return (
    <div ref={ref} tabIndex={-1} data-testid="panel">
      <button type="button">First</button>
      <button type="button">Last</button>
    </div>
  )
}

describe('useFocusTrap', () => {
  it('moves focus into the panel when activated', () => {
    renderWithProviders(<TestPanel isOpen onEscape={() => {}} />)
    expect(screen.getByTestId('panel')).toHaveFocus()
  })

  it('calls onEscape when Escape is pressed', async () => {
    const user = userEvent.setup()
    const onEscape = vi.fn()
    renderWithProviders(<TestPanel isOpen onEscape={onEscape} />)
    await user.keyboard('{Escape}')
    expect(onEscape).toHaveBeenCalledOnce()
  })

  it('wraps Tab focus from the last to the first focusable element', async () => {
    const user = userEvent.setup()
    renderWithProviders(<TestPanel isOpen onEscape={() => {}} />)
    screen.getByRole('button', { name: 'Last' }).focus()
    await user.tab()
    expect(screen.getByRole('button', { name: 'First' })).toHaveFocus()
  })

  it('restores focus to the previously focused element when closed', () => {
    function Wrapper({ isOpen }: { isOpen: boolean }) {
      return (
        <>
          <button type="button">Trigger</button>
          <TestPanel isOpen={isOpen} onEscape={() => {}} />
        </>
      )
    }

    const { rerender } = renderWithProviders(<Wrapper isOpen={false} />)
    screen.getByRole('button', { name: 'Trigger' }).focus()
    rerender(<Wrapper isOpen />)
    rerender(<Wrapper isOpen={false} />)
    expect(screen.getByRole('button', { name: 'Trigger' })).toHaveFocus()
  })
})
