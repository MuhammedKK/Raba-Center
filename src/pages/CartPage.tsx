import { Minus, Plus, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import abaImage from '@/assets/images/courses/course-aba-technician.jpg'
import supervisorImage from '@/assets/images/courses/course-autism-supervisor.jpg'
import specialistImage from '@/assets/images/courses/course-behavior-specialist.jpg'
import speechImage from '@/assets/images/courses/course-speech-foundations.jpg'
import { useCartStore } from '@/features/cart/store/useCartStore'
import type { Course } from '@/features/courses/courses.types'
import { useCourses } from '@/features/courses/hooks/useCourses'
import { Button } from '@/shared/components/ui'
import { formatCurrency } from '@/shared/utils/formatCurrency'
import type { Locale } from '@/types/common.types'

const imageByCourse: Record<Course['image'], string> = {
  aba: abaImage,
  supervisor: supervisorImage,
  specialist: specialistImage,
  speech: speechImage,
}

export default function CartPage() {
  const { t } = useTranslation('account')
  const { locale = 'ar' } = useParams<{ locale: string }>()
  const { courses } = useCourses()
  const items = useCartStore((state) => state.items)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  const lineItems = items
    .map((item) => ({ item, course: courses.find((course) => course.id === item.courseId) }))
    .filter((entry): entry is { item: (typeof items)[number]; course: Course } =>
      Boolean(entry.course),
    )

  const subtotal = lineItems.reduce(
    (sum, { item, course }) => sum + item.quantity * course.price,
    0,
  )

  if (lineItems.length === 0) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">
        <p className="text-neutral-500">{t('cart.empty')}</p>
        <Link to={`/${locale}/courses`}>
          <Button>{t('favorites.browse')}</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-4">
        {lineItems.map(({ item, course }) => (
          <div
            key={item.courseId}
            className="flex items-center gap-4 rounded-2xl border border-neutral-200 p-4"
          >
            <img
              src={imageByCourse[course.image]}
              alt=""
              aria-hidden
              className="size-20 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold text-neutral-900">{t(course.title)}</h3>
              <p className="text-primary-700 mt-1 font-bold">
                {formatCurrency(course.price, locale as Locale)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity(item.courseId, item.quantity - 1)}
                aria-label={t('cart.decrease')}
                className="rounded-full p-1.5 text-neutral-500 ring-1 ring-neutral-200 hover:bg-neutral-50"
              >
                <Minus className="size-4" aria-hidden />
              </button>
              <span className="w-6 text-center font-semibold">{item.quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(item.courseId, item.quantity + 1)}
                aria-label={t('cart.increase')}
                className="rounded-full p-1.5 text-neutral-500 ring-1 ring-neutral-200 hover:bg-neutral-50"
              >
                <Plus className="size-4" aria-hidden />
              </button>
            </div>

            <button
              type="button"
              onClick={() => removeItem(item.courseId)}
              aria-label={t('cart.remove')}
              className="text-danger-500 rounded-full p-2 hover:bg-neutral-100"
            >
              <Trash2 className="size-4" aria-hidden />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between rounded-2xl border border-neutral-200 p-5">
        <div>
          <p className="text-sm text-neutral-500">{t('cart.subtotal')}</p>
          <p className="text-2xl font-bold text-neutral-900">
            {formatCurrency(subtotal, locale as Locale)}
          </p>
        </div>
        <Link to={`/${locale}/checkout`}>
          <Button size="lg">{t('cart.checkout')}</Button>
        </Link>
      </div>
    </div>
  )
}
