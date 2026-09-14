import { useTranslation } from 'react-i18next'
import { NavLink, useParams } from 'react-router'
import { routePaths } from '@/app/router/routePaths'
import { cn } from '@/shared/utils/cn'

const navItems = [
  { key: 'home', path: routePaths.home },
  { key: 'about', path: routePaths.about },
  { key: 'services', path: routePaths.services },
  { key: 'courses', path: routePaths.courses },
  { key: 'trainers', path: routePaths.trainers },
  { key: 'branches', path: routePaths.branches },
  { key: 'blog', path: routePaths.blog },
  { key: 'contact', path: routePaths.contact },
] as const

interface NavMenuProps {
  className?: string
  onNavigate?: () => void
}

export function NavMenu({ className, onNavigate }: NavMenuProps) {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()

  return (
    <nav className={cn('flex items-center gap-1', className)}>
      {navItems.map((item) => (
        <NavLink
          key={item.key}
          to={`/${locale}${item.path ? `/${item.path}` : ''}`}
          onClick={onNavigate}
          end={item.path === ''}
          className={({ isActive }) =>
            cn(
              'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
                : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900',
            )
          }
        >
          {t(`nav.${item.key}`)}
        </NavLink>
      ))}
    </nav>
  )
}
