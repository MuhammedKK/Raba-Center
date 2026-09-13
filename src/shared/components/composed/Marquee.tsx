import { useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useDirection } from '@/shared/hooks/useDirection'
import { cn } from '@/shared/utils/cn'

interface MarqueeProps {
  children: ReactNode[]
  durationSeconds?: number
  className?: string
}

export function Marquee({ children, durationSeconds = 24, className }: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion()
  const direction = useDirection()

  if (prefersReducedMotion) {
    return (
      <div className={cn('flex flex-wrap items-center justify-center gap-10', className)}>
        {children}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        className,
      )}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className="flex shrink-0 animate-[marquee_var(--marquee-duration)_linear_infinite] items-center justify-around gap-10 pe-10 group-hover:[animation-play-state:paused]"
          style={{
            // @ts-expect-error -- custom property
            '--marquee-duration': `${durationSeconds}s`,
            animationDirection: direction === 'rtl' ? 'reverse' : 'normal',
          }}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
