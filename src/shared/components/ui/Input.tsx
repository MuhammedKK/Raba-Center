import { type InputHTMLAttributes, forwardRef, useId } from 'react'
import { cn } from '@/shared/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, id, className, ...props },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`

  return (
    <div className="flex flex-col gap-1.5 text-start">
      <label htmlFor={inputId} className="text-sm font-medium text-neutral-700">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          'focus:border-primary-500 focus:ring-primary-100 rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 transition-colors outline-none placeholder:text-neutral-400 focus:ring-2',
          error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/10',
          className,
        )}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="text-danger-500 text-sm">
          {error}
        </p>
      )}
    </div>
  )
})
