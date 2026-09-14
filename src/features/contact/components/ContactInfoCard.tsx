import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { buildWhatsAppLink } from '@/features/branches/branches.utils'
import { SocialIcon, type SocialPlatform } from '@/shared/components/ui/SocialIcon'
import { MAIN_EMAIL, MAIN_PHONE, MAIN_WHATSAPP } from '@/shared/constants/contact'

const socialLinks: { platform: SocialPlatform; label: string; href: string }[] = [
  { platform: 'facebook', label: 'Facebook', href: '#' },
  { platform: 'instagram', label: 'Instagram', href: '#' },
  { platform: 'x', label: 'X', href: '#' },
  { platform: 'linkedin', label: 'LinkedIn', href: '#' },
]

export function ContactInfoCard() {
  const { t } = useTranslation('contact')
  const whatsappHref = buildWhatsAppLink(MAIN_WHATSAPP, t('info.whatsappMessage'))

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
      <h2 className="text-lg font-bold text-neutral-900">{t('info.title')}</h2>

      <ul className="mt-4 flex flex-col gap-3 text-sm text-neutral-700">
        <li>
          <a href={`tel:${MAIN_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-2">
            <Phone className="text-primary-600 size-4 shrink-0" aria-hidden />
            {MAIN_PHONE}
          </a>
        </li>
        <li>
          <a href={`mailto:${MAIN_EMAIL}`} className="flex items-center gap-2">
            <Mail className="text-primary-600 size-4 shrink-0" aria-hidden />
            {MAIN_EMAIL}
          </a>
        </li>
        <li className="flex items-center gap-2">
          <MapPin className="text-primary-600 size-4 shrink-0" aria-hidden />
          {t('info.address')}
        </li>
        <li>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="text-success-500 flex items-center gap-2 font-semibold"
          >
            <MessageCircle className="size-4 shrink-0" aria-hidden />
            {t('info.whatsapp')}
          </a>
        </li>
      </ul>

      <div className="mt-5 flex gap-2 border-t border-neutral-100 pt-5">
        {socialLinks.map(({ platform, label, href }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="hover:text-primary-600 rounded-full bg-neutral-100 p-2 text-neutral-500"
          >
            <SocialIcon platform={platform} />
          </a>
        ))}
      </div>
    </div>
  )
}
