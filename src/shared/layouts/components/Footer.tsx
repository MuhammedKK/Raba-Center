import { Mail, MapPin, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import { routePaths } from '@/app/router/routePaths'
import { SocialIcon, type SocialPlatform } from '@/shared/components/ui/SocialIcon'
import { MAIN_EMAIL, MAIN_PHONE } from '@/shared/constants/contact'

const quickLinks = [
  { key: 'about', path: routePaths.about },
  { key: 'services', path: routePaths.services },
  { key: 'courses', path: routePaths.courses },
  { key: 'branches', path: routePaths.branches },
  { key: 'blog', path: routePaths.blog },
  { key: 'contact', path: routePaths.contact },
] as const

const socialLinks: { platform: SocialPlatform; label: string; href: string }[] = [
  { platform: 'facebook', label: 'Facebook', href: '#' },
  { platform: 'instagram', label: 'Instagram', href: '#' },
  { platform: 'x', label: 'X', href: '#' },
  { platform: 'linkedin', label: 'LinkedIn', href: '#' },
]

export function Footer() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()

  return (
    <footer className="bg-secondary-700 border-t border-neutral-200 text-neutral-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <span className="text-lg font-bold">{t('brand.fullName')}</span>
          <p className="text-sm text-neutral-200">{t('footer.tagline')}</p>
          <div className="flex gap-2 pt-2">
            {socialLinks.map(({ platform, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="rounded-full bg-white/10 p-2 hover:bg-white/20"
              >
                <SocialIcon platform={platform} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-neutral-300 uppercase">
            {t('footer.quickLinks')}
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-neutral-200">
            {quickLinks.map((link) => (
              <li key={link.key}>
                <Link to={`/${locale}/${link.path}`} className="hover:text-white">
                  {t(`nav.${link.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold tracking-wide text-neutral-300 uppercase">
            {t('footer.contactInfo')}
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-neutral-200">
            <li className="flex items-center gap-2">
              <Phone className="size-4" aria-hidden /> {MAIN_PHONE}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4" aria-hidden /> {MAIN_EMAIL}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4" aria-hidden /> Riyadh, Saudi Arabia
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-neutral-300 sm:px-6">
        © {new Date().getFullYear()} {t('brand.fullName')} — {t('footer.rights')}
      </div>
    </footer>
  )
}
