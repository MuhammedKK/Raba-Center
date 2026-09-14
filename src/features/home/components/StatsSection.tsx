import { useTranslation } from 'react-i18next'
import type { OrgStat } from '@/mocks/data/stats.data'
import { AnimatedSection } from '@/shared/components/composed/AnimatedSection'
import { AnimatedStatsCounter } from '@/shared/components/composed/AnimatedStatsCounter'

const suffixById: Record<string, string> = {
  specialists: '+',
}

export function StatsSection({ stats }: { stats: OrgStat[] }) {
  const { t } = useTranslation('home')

  return (
    <AnimatedSection className="border-y border-neutral-200 bg-white/50 py-14 backdrop-blur-sm">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-4">
        {stats.map((stat) => (
          <AnimatedStatsCounter
            key={stat.id}
            value={stat.value}
            suffix={suffixById[stat.id] ?? '%'}
            label={t(`stats.${stat.id}`)}
          />
        ))}
      </div>
    </AnimatedSection>
  )
}
