import { Star } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

interface RatingStarsProps {
  value: number
  max?: number
  className?: string
}

export function RatingStars({ value, max = 5, className }: RatingStarsProps) {
  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      role="img"
      aria-label={`${value} / ${max}`}
    >
      {Array.from({ length: max }, (_, index) => {
        const filled = index + 1 <= Math.round(value)
        return (
          <Star
            key={index}
            className={cn(
              'size-4',
              filled ? 'fill-accent-500 text-accent-500' : 'text-neutral-200 dark:text-neutral-700',
            )}
            aria-hidden
          />
        )
      })}
    </div>
  )
}
