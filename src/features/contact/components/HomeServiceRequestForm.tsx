import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { contactApi } from '@/api/endpoints/contact.api'
import {
  createHomeServiceRequestSchema,
  type HomeServiceRequestValues,
} from '@/features/contact/schemas/homeServiceRequest.schema'
import { Button, Input } from '@/shared/components/ui'

export function HomeServiceRequestForm() {
  const { t } = useTranslation('contact')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const schema = useMemo(() => createHomeServiceRequestSchema(t), [t])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<HomeServiceRequestValues>({ resolver: zodResolver(schema) })

  async function onSubmit(values: HomeServiceRequestValues) {
    await contactApi.submitHomeServiceRequest(values)
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
      <Input label={t('fields.address')} error={errors.address?.message} {...register('address')} />
      <div className="flex flex-col gap-1.5 text-start">
        <label
          htmlFor="home-service-notes"
          className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {t('fields.notes')}
        </label>
        <textarea
          id="home-service-notes"
          rows={3}
          aria-invalid={Boolean(errors.notes)}
          className="focus:border-primary-500 focus:ring-primary-100 rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 transition-colors outline-none focus:ring-2 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:focus:ring-primary-900/30"
          {...register('notes')}
        />
        {errors.notes && (
          <p role="alert" className="text-danger-500 text-sm">
            {errors.notes.message}
          </p>
        )}
      </div>
      <Button type="submit" size="lg" isLoading={isSubmitting}>
        {t('actions.submit')}
      </Button>
    </form>
  )
}
