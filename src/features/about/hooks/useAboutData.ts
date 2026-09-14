import { useEffect, useState } from 'react'
import { accreditationsApi } from '@/api/endpoints/accreditations.api'
import { statsApi } from '@/api/endpoints/stats.api'
import { teamApi } from '@/api/endpoints/team.api'
import { valuesApi } from '@/api/endpoints/values.api'
import type { TeamMember, ValueItem } from '@/features/about/about.types'
import type { Accreditation } from '@/features/home/home.types'
import type { OrgStat } from '@/mocks/data/stats.data'

interface AboutData {
  stats: OrgStat[]
  team: TeamMember[]
  certifications: Accreditation[]
  values: ValueItem[]
}

const emptyState: AboutData = { stats: [], team: [], certifications: [], values: [] }

export function useAboutData() {
  const [data, setData] = useState<AboutData>(emptyState)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    Promise.all([
      statsApi.getStats(),
      teamApi.getTeam(),
      accreditationsApi.getCredentials(),
      valuesApi.getValues(),
    ])
      .then(([stats, team, certifications, values]) => {
        if (cancelled) return
        setData({ stats, team, certifications, values })
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { ...data, isLoading }
}
