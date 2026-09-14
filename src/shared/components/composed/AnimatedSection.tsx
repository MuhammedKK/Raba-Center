import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useScrollReveal } from '@/shared/hooks/useScrollReveal'
import { cn } from '@/shared/utils/cn'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'section' | 'div'
  id?: string
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  as = 'section',
  id,
}: AnimatedSectionProps) {
  const { ref, isInView } = useScrollReveal()
  const prefersReducedMotion = useReducedMotion()
  const Component = motion[as]

  return (
    <Component
      ref={ref}
      id={id}
      className={cn(className)}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  )
}
