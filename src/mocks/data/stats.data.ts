export interface OrgStat {
  id: string
  value: number
  labelKey: string
}

export const statsData: OrgStat[] = [
  { id: 'satisfaction', value: 92, labelKey: 'about:stats.satisfaction' },
  { id: 'effectiveness', value: 90, labelKey: 'about:stats.effectiveness' },
  { id: 'improvement', value: 87, labelKey: 'about:stats.improvement' },
  { id: 'specialists', value: 30, labelKey: 'about:stats.specialists' },
]
