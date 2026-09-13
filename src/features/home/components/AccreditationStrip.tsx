import { useTranslation } from 'react-i18next'
import type { Accreditation } from '@/features/home/home.types'
import { CredentialBadge } from '@/shared/components/composed/CredentialBadge'
import { Marquee } from '@/shared/components/composed/Marquee'

export function AccreditationStrip({ credentials }: { credentials: Accreditation[] }) {
  const { t } = useTranslation('home')

  if (credentials.length === 0) return null

  return (
    <div className="border-y border-neutral-200 bg-white py-8">
      <p className="mb-5 text-center text-xs font-semibold tracking-wide text-neutral-400 uppercase">
        {t('credentials.eyebrow')}
      </p>
      <Marquee durationSeconds={20}>
        {credentials.map((credential) => (
          <CredentialBadge key={credential.id} {...credential} />
        ))}
      </Marquee>
    </div>
  )
}
