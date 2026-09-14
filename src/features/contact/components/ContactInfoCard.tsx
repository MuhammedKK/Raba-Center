import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SocialIcon, type SocialPlatform } from '@/shared/components/ui/SocialIcon'
import { MAIN_EMAIL, MAIN_PHONE, MAIN_WHATSAPP } from '@/shared/constants/contact'
import { buildWhatsAppLink } from '@/shared/utils/whatsapp'

const socialLinks: { platform: SocialPlatform; label: string; href: string }[] = [
  { platform: 'facebook', label: 'Facebook', href: 'https://facebook.com/raba.treatment' },
  { platform: 'instagram', label: 'Instagram', href: 'https://instagram.com/rabacenter' },
  { platform: 'x', label: 'X', href: 'https://x.com/rabacenter' },
]

export function ContactInfoCard() {
  const { t } = useTranslation('contact')
  const whatsappHref = buildWhatsAppLink(MAIN_WHATSAPP, t('info.whatsappMessage'))

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-50">{t('info.title')}</h2>

      <ul className="mt-4 flex flex-col gap-3 text-sm text-neutral-700 dark:text-neutral-300">
        <li>
          <a href={`tel:${MAIN_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-2">
            <Phone className="text-primary-600 size-4 shrink-0" aria-hidden />
            <span dir="ltr">{MAIN_PHONE}</span>
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

      <div className="mt-5 flex gap-2 border-t border-neutral-100 pt-5 dark:border-neutral-800">
        {socialLinks.map(({ platform, label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="hover:text-primary-600 dark:hover:text-primary-400 rounded-full bg-neutral-100 p-2 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
          >
            <SocialIcon platform={platform} />
          </a>
        ))}
      </div>
    </div>
  )
}
