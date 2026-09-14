import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/utils/cn'

const categories = [
  'all',
  'earlyIntervention',
  'speechLanguage',
  'sensoryPlay',
  'parenting',
] as const

export function BlogFilterBar({
  value,
  onChange,
}: {
  value: string
  onChange: (category: string) => void
}) {
  const { t } = useTranslation('blog')

  return (
    <div role="tablist" aria-label={t('filter.label')} className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          role="tab"
          onClick={() => onChange(category)}
          aria-selected={value === category}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
            value === category
              ? 'bg-primary-500 text-white'
              : 'bg-white text-neutral-700 ring-1 ring-neutral-200 hover:bg-neutral-50',
          )}
        >
          {t(`filter.${category}`)}
        </button>
      ))}
    </div>
  )
}
