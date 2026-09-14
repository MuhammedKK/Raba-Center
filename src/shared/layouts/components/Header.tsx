import { Heart, LogOut, Menu, ShoppingBag, UserRound } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MobileNavDrawer } from './MobileNavDrawer'
import { NavMenu } from './NavMenu'
import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { useCartStore } from '@/features/cart/store/useCartStore'
import { Logo } from '@/shared/components/composed/Logo'
import { ThemeToggle } from '@/shared/components/composed/ThemeToggle'

export function Header() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const cartCount = useCartStore((state) => state.items.length)

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to={`/${locale}`} aria-label={t('brand.fullName')} className="flex items-center">
          <Logo className="h-9" />
        </Link>

        <NavMenu className="hidden md:flex" />

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LanguageSwitcher />
          <Link
            to={`/${locale}/favorites`}
            aria-label={t('account.favorites')}
            className="rounded-full p-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
          >
            <Heart className="size-5" aria-hidden />
          </Link>
          <Link
            to={`/${locale}/cart`}
            aria-label={t('account.cart')}
            className="relative rounded-full p-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
          >
            <ShoppingBag className="size-5" aria-hidden />
            {cartCount > 0 && (
              <span className="bg-hope-500 absolute end-0 top-0 flex size-4 items-center justify-center rounded-full text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <button
              type="button"
              onClick={logout}
              aria-label={t('account.logout')}
              title={user?.name}
              className="hidden items-center gap-1.5 rounded-full p-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900 sm:inline-flex"
            >
              <LogOut className="size-5" aria-hidden />
            </button>
          ) : (
            <Link
              to={`/${locale}/login`}
              aria-label={t('account.login')}
              className="hidden rounded-full p-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900 sm:inline-flex"
            >
              <UserRound className="size-5" aria-hidden />
            </Link>
          )}
          <button
            type="button"
            aria-label={t('actions.menu')}
            onClick={() => setDrawerOpen(true)}
            className="rounded-full p-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900 md:hidden"
          >
            <Menu className="size-5" aria-hidden />
          </button>
        </div>
      </div>
      <MobileNavDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  )
}
