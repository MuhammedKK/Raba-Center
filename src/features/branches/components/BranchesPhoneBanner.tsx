import { Clock, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { MAIN_PHONE } from '@/shared/constants/contact'

export function BranchesPhoneBanner() {
  const { t } = useTranslation('branches')

  return (
    <div className="bg-secondary-700 flex flex-col items-center justify-center gap-4 rounded-2xl px-6 py-6 text-white sm:flex-row sm:gap-10">
      <a
        href={`tel:${MAIN_PHONE.replace(/\s/g, '')}`}
        className="flex items-center gap-2 font-semibold"
      >
        <Phone className="size-5" aria-hidden />
        {MAIN_PHONE}
      </a>
      <span className="flex items-center gap-2 text-sm text-white/85">
        <Clock className="size-5" aria-hidden />
        {t('banner.hours')}
      </span>
    </div>
  )
}
