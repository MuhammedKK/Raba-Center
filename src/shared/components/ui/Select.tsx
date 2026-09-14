import { type SelectHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '@/shared/utils/cn'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, id, className, ...props },
  ref,
) {
  const generatedId = useId()
  const selectId = id ?? generatedId

  return (
    <div className="flex flex-col gap-1.5 text-start">
      <label htmlFor={selectId} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {label}
      </label>
      <select
        ref={ref}
        id={selectId}
        className={cn(
          'focus:border-primary-500 focus:ring-primary-100 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-neutral-900 transition-colors outline-none focus:ring-2 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:focus:ring-primary-900/30',
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
})
