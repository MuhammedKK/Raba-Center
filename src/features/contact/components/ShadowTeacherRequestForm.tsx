import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { contactApi } from '@/api/endpoints/contact.api'
import {
  createShadowTeacherRequestSchema,
  type ShadowTeacherRequestInput,
  type ShadowTeacherRequestValues,
} from '@/features/contact/schemas/shadowTeacherRequest.schema'
import { Button, Input } from '@/shared/components/ui'

export function ShadowTeacherRequestForm() {
  const { t } = useTranslation('contact')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const schema = useMemo(() => createShadowTeacherRequestSchema(t), [t])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ShadowTeacherRequestInput, unknown, ShadowTeacherRequestValues>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values: ShadowTeacherRequestValues) {
    await contactApi.submitShadowTeacherRequest(values)
    setIsSubmitted(true)
    reset()
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 py-12 text-center dark:border-neutral-800">
        <CheckCircle2 className="text-success-500 size-10" aria-hidden />
        <p className="font-semibold text-neutral-900 dark:text-neutral-50">{t('success.title')}</p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{t('success.subtitle')}</p>
        <Button variant="ghost" onClick={() => setIsSubmitted(false)}>
          {t('success.sendAnother')}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      <Input label={t('fields.name')} error={errors.name?.message} {...register('name')} />
      <Input
        label={t('fields.phone')}
        type="tel"
        placeholder="+966 5X XXX XXXX"
        error={errors.phone?.message}
        {...register('phone')}
      />
      <Input
        label={t('fields.schoolName')}
        error={errors.schoolName?.message}
        {...register('schoolName')}
      />
      <Input
        label={t('fields.childAge')}
        type="number"
        error={errors.childAge?.message}
        {...register('childAge')}
      />
      <Button type="submit" size="lg" isLoading={isSubmitting}>
        {t('actions.submit')}
      </Button>
    </form>
  )
}
