import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import {
  createLoginFormSchema,
  type LoginFormValues,
} from '@/features/auth/schemas/loginForm.schema'
import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { seededUser } from '@/mocks/data/users.data'
import { Button, Input } from '@/shared/components/ui'

export default function LoginPage() {
  const { t } = useTranslation('account')
  const { locale = 'ar' } = useParams<{ locale: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [authError, setAuthError] = useState(false)
  const schema = useMemo(() => createLoginFormSchema(t), [t])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(schema) })

  async function onSubmit(values: LoginFormValues) {
    setAuthError(false)
    const success = await login(values.email, values.password)
    if (!success) {
      setAuthError(true)
      return
    }
    const redirectTo = searchParams.get('redirectTo')
    navigate(redirectTo || `/${locale}`)
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-20 sm:px-6">
      <h1 className="text-2xl font-bold text-neutral-900">{t('login.title')}</h1>
      <p className="mt-2 text-sm text-neutral-500">{t('login.subtitle')}</p>

      <div className="bg-primary-50 text-primary-700 mt-5 rounded-lg px-4 py-3 text-sm">
        <p className="font-semibold">{t('login.demoHintTitle')}</p>
        <p className="mt-1">
          {seededUser.email} / {seededUser.password}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-5" noValidate>
        <Input
          label={t('login.emailLabel')}
          type="email"
          error={errors.email?.message}
          autoComplete="email"
          {...register('email')}
        />
        <Input
          label={t('login.passwordLabel')}
          type="password"
          error={errors.password?.message}
          autoComplete="current-password"
          {...register('password')}
        />
        {authError && (
          <p role="alert" className="text-danger-500 text-sm">
            {t('login.invalidCredentials')}
          </p>
        )}
        <Button type="submit" size="lg" isLoading={isSubmitting}>
          {t('login.submit')}
        </Button>
      </form>
    </div>
  )
}
