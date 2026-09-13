import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-lg bg-neutral-200', className)}
      aria-hidden
      {...props}
    />
  )
}
