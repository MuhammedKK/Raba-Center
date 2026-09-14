import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useFavoritesStore } from '@/features/favorites/store/useFavoritesStore'
import { useToast } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'

export function FavoriteButton({
  id,
  name,
  className,
}: {
  id: string
  name: string
  className?: string
}) {
  const { t } = useTranslation()
  const isFavorite = useFavoritesStore((state) => state.isFavorite(id))
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const { showToast } = useToast()

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.85 }}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        toggleFavorite(id)
        if (!isFavorite) {
          showToast(t('actions.addedToFavoritesToast', { name }), 'success')
        }
      }}
      aria-pressed={isFavorite}
      aria-label={t(isFavorite ? 'actions.removeFromFavorites' : 'actions.addToFavorites')}
      className={cn(
        'hover:text-hope-500 flex size-9 items-center justify-center rounded-full bg-white/90 text-neutral-500 shadow-sm ring-1 ring-neutral-200 transition-colors dark:bg-neutral-900/90 dark:text-neutral-400 dark:ring-neutral-700',
        isFavorite && 'text-hope-500',
        className,
      )}
    >
      <Heart className={cn('size-4', isFavorite && 'fill-hope-500')} aria-hidden />
    </motion.button>
  )
}
