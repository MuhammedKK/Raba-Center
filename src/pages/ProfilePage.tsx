import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import abaImage from '@/assets/images/courses/course-aba-technician.jpg'
import supervisorImage from '@/assets/images/courses/course-autism-supervisor.jpg'
import specialistImage from '@/assets/images/courses/course-behavior-specialist.jpg'
import speechImage from '@/assets/images/courses/course-speech-foundations.jpg'
import { useAuthStore } from '@/features/auth/store/useAuthStore'
import type { Course } from '@/features/courses/courses.types'
import { useCourses } from '@/features/courses/hooks/useCourses'
import { useFavoritesStore } from '@/features/favorites/store/useFavoritesStore'
import { useOrdersStore } from '@/features/orders/store/useOrdersStore'
import { Badge, Button } from '@/shared/components/ui'
import { formatCurrency } from '@/shared/utils/formatCurrency'
import { formatDate } from '@/shared/utils/formatDate'
import type { Locale } from '@/types/common.types'

const imageByCourse: Record<Course['image'], string> = {
  aba: abaImage,
  supervisor: supervisorImage,
  specialist: specialistImage,
  speech: speechImage,
}

export default function ProfilePage() {
  const { t } = useTranslation('account')
  const { t: tCourses } = useTranslation('courses')
  const { locale = 'ar' } = useParams<{ locale: string }>()
  const user = useAuthStore((state) => state.user)
  const { courses } = useCourses()
  const favoriteIds = useFavoritesStore((state) => state.ids)
  const orders = useOrdersStore((state) => state.orders)

  const favoriteCourses = courses.filter((course) => favoriteIds.includes(course.id))

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
        {t('profile.title')}
      </h1>

      <section className="mt-6 rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
        <h2 className="font-semibold text-neutral-900 dark:text-neutral-50">
          {t('profile.accountDetails')}
        </h2>
        <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-neutral-500 dark:text-neutral-400">
              {t('profile.nameLabel')}
            </dt>
            <dd className="font-medium text-neutral-900 dark:text-neutral-50">{user?.name}</dd>
          </div>
          <div>
            <dt className="text-sm text-neutral-500 dark:text-neutral-400">
              {t('profile.emailLabel')}
            </dt>
            <dd className="font-medium text-neutral-900 dark:text-neutral-50">{user?.email}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-8">
        <h2 className="font-semibold text-neutral-900 dark:text-neutral-50">
          {t('profile.favoritesTitle')}
        </h2>
        {favoriteCourses.length === 0 ? (
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            {t('profile.favoritesEmpty')}
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {favoriteCourses.map((course) => (
              <Link
                key={course.id}
                to={`/${locale}/courses/${course.slug}`}
                className="flex items-center gap-3 rounded-xl border border-neutral-200 p-3 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
              >
                <img
                  src={imageByCourse[course.image]}
                  alt=""
                  aria-hidden
                  className="size-14 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate font-medium text-neutral-900 dark:text-neutral-50">
                    {tCourses(course.title)}
                  </p>
                  <p className="text-primary-700 dark:text-primary-300 text-sm font-semibold">
                    {formatCurrency(course.price, locale as Locale)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="font-semibold text-neutral-900 dark:text-neutral-50">
          {t('profile.ordersTitle')}
        </h2>
        {orders.length === 0 ? (
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            {t('profile.ordersEmpty')}
          </p>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge tone="primary">{order.id}</Badge>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {t('profile.orderPlacedOn', {
                      date: formatDate(order.createdAt, locale as Locale),
                    })}
                  </span>
                </div>
                <ul className="mt-3 flex flex-col gap-1 text-sm text-neutral-700 dark:text-neutral-300">
                  {order.items.map((item) => {
                    const course = courses.find((c) => c.id === item.courseId)
                    return (
                      <li key={item.courseId}>
                        {t('profile.orderItem', {
                          name: course ? tCourses(course.title) : item.courseId,
                          quantity: item.quantity,
                        })}
                      </li>
                    )
                  })}
                </ul>
                <div className="mt-3 flex items-center justify-between border-t border-neutral-200 pt-3 dark:border-neutral-800">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {t('profile.orderTotal')}
                  </span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-50">
                    {formatCurrency(order.total, locale as Locale)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="mt-8">
        <Link to={`/${locale}/courses`}>
          <Button variant="outline">{t('favorites.browse')}</Button>
        </Link>
      </div>
    </div>
  )
}
