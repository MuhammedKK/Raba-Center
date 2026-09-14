import { cn } from '@/shared/utils/cn'

interface AvatarProps {
  name: string
  className?: string
}

const gradients = [
  'from-primary-500 to-primary-700',
  'from-accent-500 to-hope-500',
  'from-secondary-500 to-primary-600',
  'from-hope-500 to-primary-500',
]

function gradientForName(name: string) {
  const index = name.charCodeAt(0) % gradients.length
  return gradients[index]
}

function initialsForName(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()
}

export function Avatar({ name, className }: AvatarProps) {
  return (
    <span
      className={cn(
        'inline-flex size-12 items-center justify-center rounded-full bg-gradient-to-br text-base font-semibold text-white',
        gradientForName(name),
        className,
      )}
      aria-hidden
    >
      {initialsForName(name)}
    </span>
  )
}
