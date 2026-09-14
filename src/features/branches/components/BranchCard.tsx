import { motion } from 'framer-motion'
import { Clock, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BranchMapLink } from './BranchMapLink'
import { WhatsAppButton } from './WhatsAppButton'
import type { Branch } from '@/features/branches/branches.types'

export function BranchCard({ branch }: { branch: Branch }) {
  const { t } = useTranslation('branches')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-neutral-200 bg-white p-6"
    >
      <span className="bg-primary-100 text-primary-700 mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold">
        {t(branch.city)}
      </span>
      <h3 className="text-lg font-bold text-neutral-900">{t(branch.name)}</h3>

      <div className="mt-3 flex items-start gap-2 text-sm text-neutral-700">
        <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
        <span>{t(branch.address)}</span>
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm text-neutral-700">
        <Clock className="size-4 shrink-0" aria-hidden />
        <span>{t(branch.hours)}</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <WhatsAppButton branch={branch} />
        <BranchMapLink branch={branch} />
      </div>
    </motion.div>
  )
}
