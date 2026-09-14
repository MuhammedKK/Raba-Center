import { MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Branch } from '@/features/branches/branches.types'
import { buildWhatsAppLink } from '@/features/branches/branches.utils'

export function WhatsAppButton({ branch }: { branch: Branch }) {
  const { t } = useTranslation('branches')
  const message = t('whatsapp.message', { branch: t(branch.name) })
  const href = buildWhatsAppLink(branch.phone, message)

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="bg-success-500 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
    >
      <MessageCircle className="size-4" aria-hidden />
      {t('actions.whatsapp')}
    </a>
  )
}
