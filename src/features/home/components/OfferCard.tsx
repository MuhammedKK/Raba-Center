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
import abaImage from '@/assets/images/offers/offer-aba-bundle.jpg'
import homeServicesImage from '@/assets/images/offers/offer-home-services.jpg'
import trainingBundleImage from '@/assets/images/offers/offer-training-bundle.jpg'
import type { Offer } from '@/features/home/home.types'

const imageByOffer: Record<Offer['image'], string> = {
  aba: abaImage,
  homeServices: homeServicesImage,
  trainingBundle: trainingBundleImage,
}

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
      className="relative h-80 [width:min(80vw,320px)] shrink-0 snap-start overflow-hidden rounded-2xl shadow-lg"
    >
      <img
        src={imageByOffer[offer.image]}
        alt=""
        aria-hidden
        className="absolute inset-0 size-full object-cover"
        loading="lazy"
      />
      <div className="via-secondary-700/60 from-secondary-700 absolute inset-0 bg-gradient-to-t to-black/10" />

      <span className="from-accent-500 to-hope-500 absolute end-4 top-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-br text-lg font-extrabold text-white shadow-lg ring-2 ring-white/40">
        {offer.discountLabel}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <Tag className="text-accent-400 mb-3 size-7" aria-hidden />
        <h3 className="text-lg font-bold text-white">{t(offer.title)}</h3>
        <p className="mt-2 text-sm text-white/85">{t(offer.description)}</p>
      </div>
    </motion.div>
  )
}
