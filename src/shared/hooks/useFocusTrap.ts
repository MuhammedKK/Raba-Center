import { type RefObject, useEffect } from 'react'

export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  isActive: boolean,
  onEscape: () => void,
) {
  useEffect(() => {
    if (!isActive) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    ref.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onEscape()
      if (event.key !== 'Tab') return

      const focusable = ref.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus()
    }
  }, [isActive, onEscape, ref])
}
