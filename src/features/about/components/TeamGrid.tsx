import { useTranslation } from 'react-i18next'
import { TeamBioCard } from './TeamBioCard'
import type { TeamMember } from '@/features/about/about.types'
import { AnimatedSection } from '@/shared/components/composed/AnimatedSection'
import { SectionHeading } from '@/shared/components/composed/SectionHeading'

export function TeamGrid({ team }: { team: TeamMember[] }) {
  const { t } = useTranslation('about')

  if (team.length === 0) return null

  return (
    <AnimatedSection className="bg-white/50 py-20 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading align="center" eyebrow={t('team.eyebrow')} title={t('team.title')} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <TeamBioCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
