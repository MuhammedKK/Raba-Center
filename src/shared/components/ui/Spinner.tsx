import { Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/utils/cn'

interface SpinnerProps {
  label?: string
  className?: string
}

export function Spinner({ label, className }: SpinnerProps) {
  const { t } = useTranslation()
  const accessibleLabel = label ?? t('loading')

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex flex-col items-center justify-center gap-3 py-16 text-neutral-500 dark:text-neutral-400',
        className,
      )}
    >
      <Loader2 className="text-primary-500 size-8 animate-spin" aria-hidden />
      <span className="text-sm">{accessibleLabel}</span>
    </div>
  )
}
