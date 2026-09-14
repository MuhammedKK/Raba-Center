import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/utils/cn'

const cities = ['all', 'riyadh', 'jeddah', 'dammam'] as const

export function CityFilterTabs({
  value,
  onChange,
}: {
  value: string
  onChange: (city: string) => void
}) {
  const { t } = useTranslation('branches')

  return (
    <div role="tablist" aria-label={t('filter.label')} className="flex flex-wrap gap-2">
      {cities.map((city) => (
        <button
          key={city}
          type="button"
          role="tab"
          onClick={() => onChange(city)}
          aria-selected={value === city}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
            value === city
              ? 'bg-primary-500 text-white'
              : 'bg-white text-neutral-700 ring-1 ring-neutral-200 hover:bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-300 dark:ring-neutral-700 dark:hover:bg-neutral-800',
          )}
        >
          {t(`filter.${city}`)}
        </button>
      ))}
    </div>
  )
}
