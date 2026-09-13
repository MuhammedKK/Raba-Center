import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useCountUp } from './useCountUp'

describe('useCountUp', () => {
  it('stays at 0 while inactive', () => {
    const { result } = renderHook(() => useCountUp(90, false, 0.05))
    expect(result.current).toBe(0)
  })

  it('animates up to the target value once activated', async () => {
    const { result, rerender } = renderHook(({ isActive }) => useCountUp(90, isActive, 0.05), {
      initialProps: { isActive: false },
    })

    expect(result.current).toBe(0)
    act(() => rerender({ isActive: true }))
    await waitFor(() => expect(result.current).toBe(90))
  })

  it('resets to 0 and can re-trigger when deactivated then reactivated', async () => {
    const { result, rerender } = renderHook(({ isActive }) => useCountUp(50, isActive, 0.05), {
      initialProps: { isActive: true },
    })

    await waitFor(() => expect(result.current).toBe(50))

    act(() => rerender({ isActive: false }))
    expect(result.current).toBe(0)

    act(() => rerender({ isActive: true }))
    await waitFor(() => expect(result.current).toBe(50))
  })

  it('does not re-animate on subsequent renders while still active', async () => {
    const { result, rerender } = renderHook(({ isActive }) => useCountUp(50, isActive, 0.05), {
      initialProps: { isActive: true },
    })

    await waitFor(() => expect(result.current).toBe(50))
    act(() => rerender({ isActive: true }))
    expect(result.current).toBe(50)
  })
})
