import { useTranslation } from 'react-i18next'
import type { OrgStat } from '@/mocks/data/stats.data'
import { AnimatedSection } from '@/shared/components/composed/AnimatedSection'
import { AnimatedStatsCounter } from '@/shared/components/composed/AnimatedStatsCounter'
import { SectionHeading } from '@/shared/components/composed/SectionHeading'

const featuredStatIds = ['satisfaction', 'effectiveness', 'improvement']

export function OrgStats({ stats }: { stats: OrgStat[] }) {
  const { t } = useTranslation('about')
  const featured = stats.filter((stat) => featuredStatIds.includes(stat.id))

  if (featured.length === 0) return null

  return (
    <AnimatedSection className="border-y border-neutral-200 bg-neutral-50/50 py-16 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading align="center" eyebrow={t('stats.eyebrow')} title={t('stats.title')} />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {featured.map((stat) => (
            <AnimatedStatsCounter key={stat.id} value={stat.value} label={t(`stats.${stat.id}`)} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
