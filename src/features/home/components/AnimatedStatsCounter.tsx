import { useCountUp } from '@/shared/hooks/useCountUp'
import { useScrollReveal } from '@/shared/hooks/useScrollReveal'

interface AnimatedStatsCounterProps {
  value: number
  suffix?: string
  label: string
}

export function AnimatedStatsCounter({ value, suffix = '%', label }: AnimatedStatsCounterProps) {
  const { ref, isInView } = useScrollReveal()
  const displayValue = useCountUp(value, isInView)

  return (
    <div ref={ref} className="text-center">
      <div className="text-primary-700 text-4xl font-extrabold tabular-nums sm:text-5xl">
        {displayValue}
        {suffix}
      </div>
      <p className="mt-2 text-sm font-medium text-neutral-700">{label}</p>
    </div>
  )
}
