import { useTranslation } from 'react-i18next'
import rabaLogoColor from '@/assets/brand/raba-logo-color.png'
import rabaLogoWhite from '@/assets/brand/raba-logo-white.png'
import { cn } from '@/shared/utils/cn'

interface LogoProps {
  className?: string
  /** Force the white wordmark, for surfaces that are always dark (e.g. the footer). */
  alwaysWhite?: boolean
}

export function Logo({ className, alwaysWhite = false }: LogoProps) {
  const { t } = useTranslation()
  const alt = t('brand.fullName')

  if (alwaysWhite) {
    return <img src={rabaLogoWhite} alt={alt} className={cn('w-auto', className)} />
  }

  return (
    <>
      <img src={rabaLogoColor} alt={alt} className={cn('w-auto dark:hidden', className)} />
      <img src={rabaLogoWhite} alt={alt} className={cn('hidden w-auto dark:block', className)} />
    </>
  )
}
