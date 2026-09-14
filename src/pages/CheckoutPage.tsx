import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, ShieldAlert } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, useParams } from 'react-router'
import { cartApi } from '@/api/endpoints/cart.api'
import {
  createCheckoutFormSchema,
  type CheckoutFormValues,
} from '@/features/cart/schemas/checkoutForm.schema'
import { useCartStore } from '@/features/cart/store/useCartStore'
import { getDiscountedPrice } from '@/features/courses/courses.utils'
import { useCourses } from '@/features/courses/hooks/useCourses'
import { useOrdersStore } from '@/features/orders/store/useOrdersStore'
import { CardBrandIcon, type CardBrand } from '@/shared/components/composed/CardBrandIcon'
import { Badge, Button, Input } from '@/shared/components/ui'
import { cn } from '@/shared/utils/cn'
import { formatCurrency } from '@/shared/utils/formatCurrency'
import type { Locale } from '@/types/common.types'

const cardBrands: CardBrand[] = ['visa', 'mastercard']

export default function CheckoutPage() {
  const { t } = useTranslation('account')
  const { locale = 'ar' } = useParams<{ locale: string }>()
  const { courses } = useCourses()
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clear)
  const addOrder = useOrdersStore((state) => state.addOrder)
  const [orderId, setOrderId] = useState<string | null>(null)
  const schema = useMemo(() => createCheckoutFormSchema(t), [t])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({ resolver: zodResolver(schema) })

  const selectedCardBrand = watch('cardBrand')

  const subtotal = items.reduce((sum, item) => {
    const course = courses.find((c) => c.id === item.courseId)
    return sum + (course ? getDiscountedPrice(course) * item.quantity : 0)
  }, 0)

  async function onSubmit(values: CheckoutFormValues) {
    const response = await cartApi.placeOrder({ items, ...values })
    addOrder({
      id: response.orderId,
      address: values.address,
      total: subtotal,
      createdAt: new Date().toISOString(),
      items: items.map((item) => {
        const course = courses.find((c) => c.id === item.courseId)
        return {
          courseId: item.courseId,
          quantity: item.quantity,
          unitPrice: course ? getDiscountedPrice(course) : 0,
        }
      }),
    })
    setOrderId(response.orderId)
    clearCart()
  }

  if (orderId) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-3 px-4 py-24 text-center sm:px-6">
        <CheckCircle2 className="text-success-500 size-12" aria-hidden />
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          {t('checkout.confirmedTitle')}
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          {t('checkout.confirmedSubtitle', { orderId })}
        </p>
        <Link to={`/${locale}`}>
          <Button className="mt-4">{t('checkout.backHome')}</Button>
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return <Navigate to={`/${locale}/cart`} replace />
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
          {t('checkout.title')}
        </h1>
        <Badge tone="warning" className="flex items-center gap-1.5">
          <ShieldAlert className="size-3.5" aria-hidden />
          {t('checkout.demoMode')}
        </Badge>
      </div>

      <p className="mb-6 rounded-lg bg-neutral-50 px-4 py-3 text-sm text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
        {t('checkout.demoModeNotice')}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        <Input
          label={t('checkout.addressLabel')}
          error={errors.address?.message}
          {...register('address')}
        />
        <div className="flex flex-col gap-1.5 text-start">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {t('checkout.cardBrandLabel')}
          </span>
          <div className="flex gap-3">
            {cardBrands.map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => setValue('cardBrand', brand, { shouldValidate: true })}
                aria-pressed={selectedCardBrand === brand}
                aria-label={t(
                  brand === 'visa' ? 'checkout.cardBrandVisa' : 'checkout.cardBrandMastercard',
                )}
                className={cn(
                  'flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors',
                  selectedCardBrand === brand
                    ? 'border-primary-500 ring-primary-100 dark:ring-primary-900/30 ring-2'
                    : 'border-neutral-200 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900',
                )}
              >
                <CardBrandIcon brand={brand} className="h-6 w-9" />
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {t(brand === 'visa' ? 'checkout.cardBrandVisa' : 'checkout.cardBrandMastercard')}
                </span>
              </button>
            ))}
          </div>
          {errors.cardBrand && (
            <p role="alert" className="text-danger-500 text-sm">
              {errors.cardBrand.message}
            </p>
          )}
        </div>
        <Input
          label={t('checkout.cardNumberLabel')}
          placeholder="4242 4242 4242 4242"
          error={errors.cardNumber?.message}
          {...register('cardNumber')}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label={t('checkout.expiryLabel')}
            placeholder="MM/YY"
            error={errors.expiry?.message}
            {...register('expiry')}
          />
          <Input
            label={t('checkout.cvcLabel')}
            placeholder="123"
            error={errors.cvc?.message}
            {...register('cvc')}
          />
        </div>

        <div className="flex items-center justify-between border-t border-neutral-200 pt-5 dark:border-neutral-800">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {t('cart.subtotal')}
          </span>
          <span className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
            {formatCurrency(subtotal, locale as Locale)}
          </span>
        </div>

        <Button type="submit" size="lg" isLoading={isSubmitting}>
          {t('checkout.placeOrder')}
        </Button>
      </form>
    </div>
  )
}
