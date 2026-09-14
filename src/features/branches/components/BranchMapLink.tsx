import { MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Branch } from '@/features/branches/branches.types'
import { buildMapsLink } from '@/features/branches/branches.utils'

export function BranchMapLink({ branch }: { branch: Branch }) {
  const { t } = useTranslation('branches')
  const href = buildMapsLink(t(branch.address))

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-primary-600 dark:text-primary-400 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-neutral-200 transition-colors hover:bg-neutral-50 dark:ring-neutral-700 dark:hover:bg-neutral-800"
    >
      <MapPin className="size-4" aria-hidden />
      {t('actions.directions')}
    </a>
  )
}
