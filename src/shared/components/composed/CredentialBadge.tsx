import type { Accreditation } from '@/features/home/home.types'

export function CredentialBadge({ initials, name }: Accreditation) {
  return (
    <div className="hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-3 text-neutral-400 grayscale transition-all hover:grayscale-0 dark:text-neutral-500">
      <span className="flex size-11 items-center justify-center rounded-xl border border-current text-sm font-bold">
        {initials}
      </span>
      <span className="text-sm font-semibold whitespace-nowrap">{name}</span>
    </div>
  )
}
