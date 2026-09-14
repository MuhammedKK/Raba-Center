import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'

interface Bubble {
  id: number
  size: number
  top: string
  left: string
  color: string
  duration: number
  delay: number
  driftX: number
  driftY: number
}

const palette = [
  'bg-primary-300/45',
  'bg-primary-400/35',
  'bg-accent-500/25',
  'bg-hope-500/25',
  'bg-primary-500/30',
  'bg-accent-100/70',
]

function createBubbles(count: number): Bubble[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    size: 200 + Math.round(Math.random() * 260),
    top: `${Math.round(Math.random() * 90)}%`,
    left: `${Math.round(Math.random() * 90)}%`,
    color: palette[index % palette.length],
    duration: 16 + Math.round(Math.random() * 14),
    delay: Math.round(Math.random() * 4),
    driftX: 50 + Math.round(Math.random() * 70),
    driftY: 40 + Math.round(Math.random() * 60),
  }))
}

/**
 * Decorative, brand-colored blobs drifting behind the whole page. Mounted
 * once in `MainLayout`, fixed to the viewport so it reads as one continuous
 * ambient backdrop while scrolling rather than restarting per section. Page
 * sections must use a translucent background (not solid `bg-white`) for the
 * effect to actually show through. Disabled entirely under
 * prefers-reduced-motion.
 */
export function AmbientBackground({ count = 10 }: { count?: number }) {
  const prefersReducedMotion = useReducedMotion()
  const bubbles = useMemo(() => createBubbles(count), [count])

  if (prefersReducedMotion) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className={`absolute rounded-full blur-3xl ${bubble.color}`}
          style={{
            width: bubble.size,
            height: bubble.size,
            top: bubble.top,
            left: bubble.left,
          }}
          animate={{
            x: [0, bubble.driftX, -bubble.driftX * 0.6, 0],
            y: [0, -bubble.driftY, bubble.driftY * 0.6, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
