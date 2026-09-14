import { AboutHero } from '@/features/about/components/AboutHero'
import { CertificationsList } from '@/features/about/components/CertificationsList'
import { MissionVision } from '@/features/about/components/MissionVision'
import { OrgStats } from '@/features/about/components/OrgStats'
import { TeamGrid } from '@/features/about/components/TeamGrid'
import { useAboutData } from '@/features/about/hooks/useAboutData'

export default function AboutPage() {
  const { stats, team, certifications, values } = useAboutData()

  return (
    <div>
      <AboutHero />
      <MissionVision />
      <OrgStats stats={stats} />
      <TeamGrid team={team} />
      <CertificationsList certifications={certifications} values={values} />
    </div>
  )
}
