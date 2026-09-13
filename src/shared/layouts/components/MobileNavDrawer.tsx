import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { NavMenu } from './NavMenu'
import { useDirection } from '@/shared/hooks/useDirection'

interface MobileNavDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  const { t } = useTranslation()
  const direction = useDirection()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    panelRef.current?.focus()
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const offscreenX = direction === 'rtl' ? '100%' : '-100%'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-neutral-900/50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={t('actions.menu')}
            className="fixed inset-y-0 start-0 z-50 flex w-72 max-w-[80vw] flex-col gap-6 bg-white p-6 shadow-xl md:hidden"
            initial={{ x: offscreenX }}
            animate={{ x: 0 }}
            exit={{ x: offscreenX }}
            transition={{ type: 'tween', duration: 0.25 }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t('actions.close')}
              className="self-end rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100"
            >
              <X className="size-5" aria-hidden />
            </button>
            <NavMenu className="flex-col items-start gap-1" onNavigate={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
