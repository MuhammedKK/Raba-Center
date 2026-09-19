import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Suspense, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'
import * as THREE from 'three'
import { TrainerWaveCard } from './TrainerWaveCard'
import ahmedImage from '@/assets/images/trainers/ahmed-abu-zaid.jpeg'
import dohaImage from '@/assets/images/trainers/doha-khaled.jpeg'
import hanaaImage from '@/assets/images/trainers/hanaa-bashir.png'
import hishamImage from '@/assets/images/trainers/hisham-salama.png'
import type { Trainer } from '@/features/trainers/trainers.types'
import { Button } from '@/shared/components/ui'
import { useDirection } from '@/shared/hooks/useDirection'
import { useTheme } from '@/shared/hooks/useTheme'
import { cn } from '@/shared/utils/cn'

const imageByTrainer: Record<Trainer['photo'], string> = {
  hanaa: hanaaImage,
  ahmed: ahmedImage,
  hisham: hishamImage,
  doha: dohaImage,
}

function Rig({
  focusIndexRef,
  target,
}: {
  focusIndexRef: React.MutableRefObject<number>
  target: number
}) {
  const { pointer } = useThree()
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_state, delta) => {
    focusIndexRef.current = THREE.MathUtils.damp(focusIndexRef.current, target, 5, delta)
    const group = groupRef.current
    if (!group) return
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, pointer.x * 0.12, 4, delta)
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, -pointer.y * 0.06, 4, delta)
  })

  return <group ref={groupRef} />
}

interface WaveTrainer {
  id: string
  slug: string
  imageSrc: string
  name: string
  role: string
}

function Scene({
  trainers,
  focusIndexRef,
  target,
  isDark,
  onHover,
  onSelect,
}: {
  trainers: WaveTrainer[]
  focusIndexRef: React.MutableRefObject<number>
  target: number
  isDark: boolean
  onHover: (index: number | null) => void
  onSelect: (index: number) => void
}) {
  return (
    <>
      <Rig focusIndexRef={focusIndexRef} target={target} />
      <ambientLight intensity={1.2} />
      {trainers.map((trainer, index) => (
        <TrainerWaveCard
          key={trainer.id}
          index={index}
          imageSrc={trainer.imageSrc}
          name={trainer.name}
          role={trainer.role}
          isDark={isDark}
          focusIndexRef={focusIndexRef}
          onSelect={() => onSelect(index)}
          onHover={(hovering) => onHover(hovering ? index : null)}
        />
      ))}
    </>
  )
}

export function TrainerWaveCarousel({ trainers }: { trainers: Trainer[] }) {
  const { t } = useTranslation('trainers')
  const { locale } = useParams<{ locale: string }>()
  const navigate = useNavigate()
  const direction = useDirection()
  const isRtl = direction === 'rtl'
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const waveTrainers: WaveTrainer[] = trainers.map((trainer) => ({
    id: trainer.id,
    slug: trainer.slug,
    imageSrc: imageByTrainer[trainer.photo],
    name: t(trainer.name),
    role: t(trainer.role),
  }))

  const [focusIndex, setFocusIndex] = useState(0)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const focusIndexRef = useRef(0)
  const target = hoverIndex ?? focusIndex
  const canNavigate = trainers.length > 1

  function goTo(index: number) {
    setFocusIndex(THREE.MathUtils.clamp(index, 0, trainers.length - 1))
  }

  function handleSelect(index: number) {
    const trainer = trainers[index]
    if (!trainer) return
    navigate(`/${locale}/trainers/${trainer.slug}`)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    // Kept spatially literal (ArrowRight always moves right visually) rather than
    // flipped for RTL — this is a spatial 3D widget, not text, so following the
    // physical arrow direction is less surprising than following reading order.
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(focusIndex + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(focusIndex - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      goTo(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      goTo(trainers.length - 1)
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleSelect(focusIndex)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-3xl">
        {/* Custom WebGL widget: the canvas itself has no focusable DOM children,
            so keyboard support has to live on this wrapper — not modeled by
            jsx-a11y's static role checks, but the side arrows/dots below give a
            fully keyboard- and screen-reader-operable equivalent regardless. */}
        {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */}
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label={t('list.title')}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="focus-visible:outline-primary-500 h-125 w-full rounded-3xl outline-none focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {/* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */}
          <Canvas camera={{ position: [0, 0, 5.8], fov: 32 }} dpr={[1, 2]}>
            <Suspense fallback={null}>
              <Scene
                trainers={waveTrainers}
                focusIndexRef={focusIndexRef}
                target={target}
                isDark={isDark}
                onHover={setHoverIndex}
                onSelect={handleSelect}
              />
            </Suspense>
          </Canvas>
        </div>

        {canNavigate && (
          <>
            <button
              type="button"
              aria-label={t('wave.previous')}
              onClick={() => goTo(focusIndex - 1)}
              disabled={focusIndex === 0}
              className="hover:text-primary-700 hover:ring-primary-200 absolute start-0 top-1/2 z-10 flex size-10 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-600 shadow-md ring-1 ring-neutral-200 transition disabled:opacity-30 sm:-start-4 rtl:translate-x-2 dark:bg-neutral-900 dark:text-neutral-300 dark:ring-neutral-700"
            >
              {isRtl ? (
                <ChevronRight className="size-5" aria-hidden />
              ) : (
                <ChevronLeft className="size-5" aria-hidden />
              )}
            </button>
            <button
              type="button"
              aria-label={t('wave.next')}
              onClick={() => goTo(focusIndex + 1)}
              disabled={focusIndex === trainers.length - 1}
              className="hover:text-primary-700 hover:ring-primary-200 absolute end-0 top-1/2 z-10 flex size-10 translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-600 shadow-md ring-1 ring-neutral-200 transition disabled:opacity-30 sm:-end-4 rtl:-translate-x-2 dark:bg-neutral-900 dark:text-neutral-300 dark:ring-neutral-700"
            >
              {isRtl ? (
                <ChevronLeft className="size-5" aria-hidden />
              ) : (
                <ChevronRight className="size-5" aria-hidden />
              )}
            </button>
          </>
        )}
      </div>

      {canNavigate && (
        <div className="mt-6 flex gap-2" role="tablist" aria-label={t('list.title')}>
          {waveTrainers.map((trainer, index) => (
            <button
              key={trainer.id}
              type="button"
              role="tab"
              aria-selected={index === focusIndex}
              aria-label={trainer.name}
              onClick={() => goTo(index)}
              className={cn(
                'h-2 rounded-full transition-all',
                index === focusIndex
                  ? 'bg-primary-500 w-6'
                  : 'w-2 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-700 dark:hover:bg-neutral-600',
              )}
            />
          ))}
        </div>
      )}

      <Button size="sm" variant="outline" className="mt-6" onClick={() => handleSelect(focusIndex)}>
        {t('viewProfile')}
      </Button>
    </div>
  )
}
