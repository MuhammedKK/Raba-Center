import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BranchCard } from '@/features/branches/components/BranchCard'
import { BranchesPhoneBanner } from '@/features/branches/components/BranchesPhoneBanner'
import { CityFilterTabs } from '@/features/branches/components/CityFilterTabs'
import { useBranches } from '@/features/branches/hooks/useBranches'
import { SectionHeading } from '@/shared/components/composed/SectionHeading'

export default function BranchesPage() {
  const { t } = useTranslation('branches')
  const { branches } = useBranches()
  const [city, setCity] = useState('all')

  const filteredBranches =
    city === 'all' ? branches : branches.filter((branch) => branch.cityKey === city)

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow={t('list.eyebrow')} title={t('list.title')} />

      <div className="mb-8">
        <BranchesPhoneBanner />
      </div>

      <div className="mb-8">
        <CityFilterTabs value={city} onChange={setCity} />
      </div>

      {filteredBranches.length === 0 ? (
        <p className="py-16 text-center text-neutral-500">{t('list.empty')}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBranches.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>
      )}
    </div>
  )
}
