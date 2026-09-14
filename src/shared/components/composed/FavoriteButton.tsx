import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useFavoritesStore } from '@/features/favorites/store/useFavoritesStore'
import { cn } from '@/shared/utils/cn'

export function FavoriteButton({ id, className }: { id: string; className?: string }) {
  const { t } = useTranslation()
  const isFavorite = useFavoritesStore((state) => state.isFavorite(id))
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.85 }}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        toggleFavorite(id)
      }}
      aria-pressed={isFavorite}
      aria-label={t(isFavorite ? 'actions.removeFromFavorites' : 'actions.addToFavorites')}
      className={cn(
        'hover:text-hope-500 flex size-9 items-center justify-center rounded-full bg-white/90 text-neutral-500 shadow-sm ring-1 ring-neutral-200 transition-colors',
        isFavorite && 'text-hope-500',
        className,
      )}
    >
      <Heart className={cn('size-4', isFavorite && 'fill-hope-500')} aria-hidden />
    </motion.button>
  )
}
