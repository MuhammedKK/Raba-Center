import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { NavMenu } from './NavMenu'
import { Logo } from '@/shared/components/composed/Logo'
import { ThemeToggle } from '@/shared/components/composed/ThemeToggle'
import { useDirection } from '@/shared/hooks/useDirection'
import { useFocusTrap } from '@/shared/hooks/useFocusTrap'

interface MobileNavDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  const { t } = useTranslation()
  const direction = useDirection()
  const panelRef = useRef<HTMLDivElement>(null)

  useFocusTrap(panelRef, isOpen, onClose)

  const offscreenX = direction === 'rtl' ? '100%' : '-100%'

  return createPortal(
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
            className="fixed inset-y-0 start-0 z-50 flex w-72 max-w-[80vw] flex-col gap-6 bg-white p-6 shadow-xl md:hidden dark:bg-neutral-950"
            initial={{ x: offscreenX }}
            animate={{ x: 0 }}
            exit={{ x: offscreenX }}
            transition={{ type: 'tween', duration: 0.25 }}
          >
            <div className="flex items-center justify-between">
              <Logo className="h-8" />
              <button
                type="button"
                onClick={onClose}
                aria-label={t('actions.close')}
                className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 dark:text-neutral-500 dark:hover:bg-neutral-900"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <NavMenu className="flex-col items-start gap-1" onNavigate={onClose} />
            <div className="mt-auto flex items-center gap-1 border-t border-neutral-200 pt-4 dark:border-neutral-800">
              <ThemeToggle />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  )
}
