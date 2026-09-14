import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import { ContactInfoCard } from '@/features/contact/components/ContactInfoCard'
import { HomeServiceRequestForm } from '@/features/contact/components/HomeServiceRequestForm'
import { InquiryForm } from '@/features/contact/components/InquiryForm'
import { ShadowTeacherRequestForm } from '@/features/contact/components/ShadowTeacherRequestForm'
import { useTrainer } from '@/features/trainers/hooks/useTrainer'
import { SectionHeading } from '@/shared/components/composed/SectionHeading'
import { Tabs } from '@/shared/components/ui'

const tabByService: Record<string, string> = {
  'home-services': 'homeService',
  'shadow-teacher': 'shadowTeacher',
}

export default function ContactPage() {
  const { t } = useTranslation('contact')
  const [searchParams] = useSearchParams()
  const serviceParam = searchParams.get('service') ?? ''
  const defaultTab = tabByService[serviceParam] ?? 'inquiry'
  const trainerSlug = searchParams.get('trainer') ?? undefined
  const { trainer } = useTrainer(trainerSlug)
  const defaultTrainerName = trainer ? t(trainer.name) : undefined

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow={t('hero.eyebrow')} title={t('hero.title')} />

      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <Tabs defaultValue={defaultTab}>
          <Tabs.List>
            <Tabs.Trigger value="inquiry">{t('tabs.inquiry')}</Tabs.Trigger>
            <Tabs.Trigger value="homeService">{t('tabs.homeService')}</Tabs.Trigger>
            <Tabs.Trigger value="shadowTeacher">{t('tabs.shadowTeacher')}</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="inquiry">
            <InquiryForm defaultTrainerName={defaultTrainerName} />
          </Tabs.Content>
          <Tabs.Content value="homeService">
            <HomeServiceRequestForm />
          </Tabs.Content>
          <Tabs.Content value="shadowTeacher">
            <ShadowTeacherRequestForm />
          </Tabs.Content>
        </Tabs>

        <ContactInfoCard />
      </div>
    </div>
  )
}
