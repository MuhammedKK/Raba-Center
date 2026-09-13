import { animate, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export function useCountUp(target: number, isActive: boolean, durationSeconds = 1.6) {
  const [value, setValue] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (!isActive || prefersReducedMotion) {
      hasAnimatedRef.current = false
      return
    }

    if (hasAnimatedRef.current) return
    hasAnimatedRef.current = true

    const controls = animate(0, target, {
      duration: durationSeconds,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    })

    return () => controls.stop()
  }, [isActive, target, durationSeconds, prefersReducedMotion])

  // Inactive and reduced-motion both resolve without a dedicated setState —
  // only the running animation loop above owns `value`.
  if (!isActive) return 0
  if (prefersReducedMotion) return target
  return value
}
