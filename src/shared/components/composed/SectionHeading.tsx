import { motion } from 'framer-motion'
import { useDirection } from '@/shared/hooks/useDirection'
import { useScrollReveal } from '@/shared/hooks/useScrollReveal'
import { cn } from '@/shared/utils/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'start' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'start',
  className,
}: SectionHeadingProps) {
  const { ref, isInView } = useScrollReveal()
  const direction = useDirection()

  return (
    <div
      ref={ref}
      className={cn('mb-10 max-w-2xl', align === 'center' && 'mx-auto text-center', className)}
    >
      {eyebrow && (
        <span className="text-primary-600 mb-2 inline-block text-sm font-semibold tracking-wide uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
      <motion.span
        className={cn(
          'bg-accent-500 mt-3 block h-1 w-16 rounded-full',
          align === 'center' && 'mx-auto',
        )}
        style={{ transformOrigin: direction === 'rtl' ? 'right' : 'left' }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : undefined}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
      />
      {description && <p className="mt-4 text-neutral-700 dark:text-neutral-400">{description}</p>}
    </div>
  )
}
