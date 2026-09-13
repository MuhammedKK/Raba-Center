import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { Tag } from 'lucide-react'
import type { PointerEvent } from 'react'
import { useTranslation } from 'react-i18next'
import type { Offer } from '@/features/home/home.types'

export function OfferCard({ offer }: { offer: Offer }) {
  const { t } = useTranslation('home')
  const prefersReducedMotion = useReducedMotion()

  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 })
  const transform = useMotionTemplate`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5
    rotateY.set(offsetX * 14)
    rotateX.set(offsetY * -14)
  }

  function handlePointerLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ transform: prefersReducedMotion ? undefined : transform }}
      className="from-primary-600 to-secondary-700 relative [width:min(80vw,320px)] shrink-0 snap-start overflow-hidden rounded-2xl bg-gradient-to-br p-6 text-white shadow-lg"
    >
      <span className="absolute -end-6 -top-6 flex size-24 items-center justify-center rounded-full bg-white/10 text-2xl font-extrabold">
        {offer.discountLabel}
      </span>
      <Tag className="text-accent-500 mb-4 size-8" aria-hidden />
      <h3 className="text-lg font-bold">{t(offer.title)}</h3>
      <p className="mt-2 text-sm text-white/80">{t(offer.description)}</p>
    </motion.div>
  )
}
