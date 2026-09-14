import { useTranslation } from 'react-i18next'
import type { CourseFilters } from '@/features/courses/courses.types'
import { Select } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'

const categories = ['all', 'aba', 'speech'] as const
const priceOptions = [
  { value: '', maxPrice: undefined },
  { value: '500', maxPrice: 500 },
  { value: '1500', maxPrice: 1500 },
  { value: '6000', maxPrice: 6000 },
] as const

export function CourseFilterBar({
  filters,
  onCategoryChange,
  onMaxPriceChange,
}: {
  filters: CourseFilters
  onCategoryChange: (category: string) => void
  onMaxPriceChange: (maxPrice: number | undefined) => void
}) {
  const { t } = useTranslation('courses')

  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-wrap gap-2" role="group" aria-label={t('filters.category.label')}>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            aria-pressed={(filters.category ?? 'all') === category}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
              (filters.category ?? 'all') === category
                ? 'bg-primary-500 text-white'
                : 'bg-white text-neutral-700 ring-1 ring-neutral-200 hover:bg-neutral-50',
            )}
          >
            {t(`filters.category.${category}`)}
          </button>
        ))}
      </div>

      <Select
        label={t('filters.price.label')}
        className="w-48"
        value={filters.maxPrice ? String(filters.maxPrice) : ''}
        onChange={(event) => {
          const option = priceOptions.find((item) => item.value === event.target.value)
          onMaxPriceChange(option?.maxPrice)
        }}
        options={priceOptions.map((option) => ({
          value: option.value,
          label: t(`filters.price.options.${option.value || 'any'}`),
        }))}
      />
    </div>
  )
}
