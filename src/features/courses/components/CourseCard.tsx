import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import abaImage from '@/assets/images/courses/course-aba-technician.jpg'
import supervisorImage from '@/assets/images/courses/course-autism-supervisor.jpg'
import specialistImage from '@/assets/images/courses/course-behavior-specialist.jpg'
import speechImage from '@/assets/images/courses/course-speech-foundations.jpg'
import type { Course } from '@/features/courses/courses.types'
import { FavoriteButton } from '@/shared/components/composed/FavoriteButton'
import { Card, RatingStars } from '@/shared/components/ui'
import { formatCurrency } from '@/shared/utils/formatCurrency'
import type { Locale } from '@/types/common.types'

const imageByCourse: Record<Course['image'], string> = {
  aba: abaImage,
  supervisor: supervisorImage,
  specialist: specialistImage,
  speech: speechImage,
}

export function CourseCard({ course }: { course: Course }) {
  const { t } = useTranslation('courses')
  const { locale = 'ar' } = useParams<{ locale: string }>()

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <Card className="h-full">
        <Link to={`/${locale}/courses/${course.slug}`}>
          <Card.Media className="relative">
            <img
              src={imageByCourse[course.image]}
              alt=""
              aria-hidden
              className="size-full object-cover"
              loading="lazy"
            />
            <FavoriteButton id={course.id} className="absolute end-3 top-3" />
          </Card.Media>
          <Card.Body>
            <h3 className="line-clamp-2 min-h-12 font-semibold text-neutral-900 dark:text-neutral-50">
              {t(course.title)}
            </h3>
            <div className="mt-2 flex items-center gap-2">
              <RatingStars value={course.rating} />
              <span className="text-xs text-neutral-400">({course.reviewCount})</span>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-sm text-neutral-700 dark:text-neutral-400">
              <Clock className="size-4" aria-hidden />
              {t('duration', { count: course.durationHours })}
            </div>
          </Card.Body>
        </Link>
        <Card.Footer>
          <span className="text-primary-700 dark:text-primary-300 text-lg font-bold">
            {formatCurrency(course.price, locale as Locale)}
          </span>
        </Card.Footer>
      </Card>
    </motion.div>
  )
}
