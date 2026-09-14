import { Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import abaImage from '@/assets/images/courses/course-aba-technician.jpg'
import supervisorImage from '@/assets/images/courses/course-autism-supervisor.jpg'
import specialistImage from '@/assets/images/courses/course-behavior-specialist.jpg'
import speechImage from '@/assets/images/courses/course-speech-foundations.jpg'
import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { useCartStore } from '@/features/cart/store/useCartStore'
import { CourseCurriculumList } from '@/features/courses/components/CourseCurriculumList'
import { TrainerRefCard } from '@/features/courses/components/TrainerRefCard'
import type { Course } from '@/features/courses/courses.types'
import { useCourse } from '@/features/courses/hooks/useCourse'
import { useTrainers } from '@/features/trainers/hooks/useTrainers'
import { FavoriteButton } from '@/shared/components/composed/FavoriteButton'
import { Button, RatingStars, Skeleton, useToast } from '@/shared/components/ui'
import { formatCurrency } from '@/shared/utils/formatCurrency'
import type { Locale } from '@/types/common.types'

const imageByCourse: Record<Course['image'], string> = {
  aba: abaImage,
  supervisor: supervisorImage,
  specialist: specialistImage,
  speech: speechImage,
}

export default function CourseDetailPage() {
  const { t } = useTranslation('courses')
  const { slug, locale = 'ar' } = useParams<{ slug: string; locale: string }>()
  const { course, isLoading, notFound } = useCourse(slug)
  const { trainers } = useTrainers()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const addToCart = useCartStore((state) => state.addItem)
  const { showToast } = useToast()

  if (notFound) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          {t('detail.notFound')}
        </h1>
        <Link
          to={`/${locale}/courses`}
          className="text-primary-600 dark:text-primary-400 mt-4 inline-block font-semibold"
        >
          {t('list.eyebrow')}
        </Link>
      </div>
    )
  }

  if (isLoading || !course) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Skeleton className="h-72 w-full" />
      </div>
    )
  }

  const trainer = trainers.find((item) => item.id === course.trainerId)
  const courseId = course.id

  function handleEnroll() {
    if (!isAuthenticated) return
    addToCart(courseId)
    showToast(t('detail.enrollSuccess'), 'success')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <img
            src={imageByCourse[course.image]}
            alt=""
            aria-hidden
            className="size-full object-cover"
          />
          <FavoriteButton id={course.id} className="absolute end-4 top-4" />
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-50">
            {t(course.title)}
          </h1>
          <div className="mt-3 flex items-center gap-2">
            <RatingStars value={course.rating} />
            <span className="text-sm text-neutral-400">({course.reviewCount})</span>
          </div>
          <p className="mt-4 text-neutral-700 dark:text-neutral-400">{t(course.description)}</p>

          <div className="mt-5 flex items-center gap-1.5 text-sm text-neutral-700 dark:text-neutral-400">
            <Clock className="size-4" aria-hidden />
            {t('duration', { count: course.durationHours })}
          </div>

          <div className="mt-6 flex items-center justify-between rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <span className="text-primary-700 dark:text-primary-300 text-2xl font-bold">
              {formatCurrency(course.price, locale as Locale)}
            </span>
            {isAuthenticated ? (
              <Button size="lg" onClick={handleEnroll}>
                {t('detail.enroll')}
              </Button>
            ) : (
              <Link to={`/${locale}/login?redirectTo=/${locale}/courses/${course.slug}`}>
                <Button size="lg">{t('detail.enroll')}</Button>
              </Link>
            )}
          </div>

          {trainer && (
            <div className="mt-6">
              <TrainerRefCard trainer={trainer} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-14">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
          {t('detail.curriculum')}
        </h2>
        <div className="mt-5">
          <CourseCurriculumList modules={course.curriculum} />
        </div>
      </div>
    </div>
  )
}
