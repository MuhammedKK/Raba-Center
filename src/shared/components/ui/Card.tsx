import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'

function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md',
        className,
      )}
      {...props}
    />
  )
}

function CardMedia({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('aspect-[4/3] w-full overflow-hidden bg-neutral-100', className)}
      {...props}
    />
  )
}

function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-5', className)} {...props} />
}

function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center justify-between border-t border-neutral-200 p-5', className)}
      {...props}
    />
  )
}

Card.Media = CardMedia
Card.Body = CardBody
Card.Footer = CardFooter

export { Card }
