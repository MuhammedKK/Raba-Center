import { useTranslation } from 'react-i18next'
import { MAIN_WHATSAPP } from '@/shared/constants/contact'
import { buildWhatsAppLink } from '@/shared/utils/whatsapp'

export function FloatingWhatsAppButton() {
  const { t } = useTranslation()
  const label = t('actions.whatsappTooltip')
  const href = buildWhatsAppLink(MAIN_WHATSAPP, t('actions.whatsappTooltip'))

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="fixed bottom-6 end-6 z-30 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-4 ring-[#25D366]/20 transition-transform hover:scale-105 hover:ring-[#25D366]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
    >
      <svg viewBox="0 0 32 32" className="size-8" fill="currentColor" aria-hidden>
        <path d="M16.004 3C9.09 3 3.48 8.58 3.48 15.45c0 2.42.67 4.68 1.85 6.62L3 29l7.13-2.28a12.9 12.9 0 0 0 5.87 1.42h.01c6.91 0 12.52-5.58 12.52-12.45C28.53 8.82 22.92 3 16.004 3zm0 22.77h-.01a10.4 10.4 0 0 1-5.31-1.46l-.38-.23-3.98 1.27 1.3-3.87-.25-.4a10.24 10.24 0 0 1-1.62-5.63c0-5.66 4.63-10.27 10.32-10.27 5.68 0 10.31 4.6 10.31 10.27 0 5.67-4.63 10.32-10.32 10.32zm5.63-7.72c-.31-.15-1.82-.9-2.1-1-.28-.1-.49-.15-.7.16-.2.3-.8 1-.98 1.2-.18.2-.36.23-.67.08-.31-.16-1.3-.48-2.48-1.53-.92-.82-1.53-1.83-1.72-2.14-.18-.3-.02-.47.13-.62.14-.14.31-.36.46-.54.15-.18.2-.3.31-.51.1-.2.05-.38-.02-.53-.08-.16-.7-1.7-.96-2.32-.25-.6-.5-.52-.7-.53h-.6c-.2 0-.53.08-.81.38-.28.3-1.06 1.04-1.06 2.53s1.09 2.94 1.24 3.15c.15.2 2.14 3.26 5.18 4.57.72.31 1.29.5 1.73.64.73.23 1.39.2 1.91.12.58-.09 1.82-.75 2.08-1.46.26-.72.26-1.34.18-1.47-.08-.13-.28-.2-.59-.35z" />
      </svg>
    </a>
  )
}
