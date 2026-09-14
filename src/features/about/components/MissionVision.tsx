import { Compass, Target } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimatedSection } from '@/shared/components/composed/AnimatedSection'

export function MissionVision() {
  const { t } = useTranslation('about')

  return (
    <AnimatedSection className="bg-white/50 py-20 backdrop-blur-sm">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white/80 p-8">
          <span className="bg-primary-100 text-primary-700 mb-5 flex size-12 items-center justify-center rounded-full">
            <Target className="size-6" aria-hidden />
          </span>
          <h3 className="text-xl font-bold text-neutral-900">{t('mission.missionTitle')}</h3>
          <p className="mt-3 text-neutral-700">{t('mission.missionText')}</p>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-white/80 p-8">
          <span className="bg-accent-100 text-accent-600 mb-5 flex size-12 items-center justify-center rounded-full">
            <Compass className="size-6" aria-hidden />
          </span>
          <h3 className="text-xl font-bold text-neutral-900">{t('mission.visionTitle')}</h3>
          <p className="mt-3 text-neutral-700">{t('mission.visionText')}</p>
        </div>
      </div>
    </AnimatedSection>
  )
}
