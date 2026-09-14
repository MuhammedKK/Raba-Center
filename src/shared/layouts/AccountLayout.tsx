import { useTranslation } from 'react-i18next'
import { NavLink, Outlet, useParams } from 'react-router'
import { routePaths } from '@/app/router/routePaths'
import { cn } from '@/shared/utils/cn'

const accountNavItems = [
  { key: 'favorites', path: routePaths.favorites },
  { key: 'cart', path: routePaths.cart },
] as const

export function AccountLayout() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()

  return (
    <div>
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <div role="tablist" className="mx-auto flex max-w-6xl gap-2 px-4 sm:px-6">
          {accountNavItems.map((item) => (
            <NavLink
              key={item.key}
              to={`/${locale}/${item.path}`}
              role="tab"
              className={({ isActive }) =>
                cn(
                  '-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-primary-500 text-primary-700 dark:border-primary-400 dark:text-primary-300'
                    : 'border-transparent text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200',
                )
              }
            >
              {t(`account.${item.key}`)}
            </NavLink>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  )
}
