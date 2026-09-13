import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import type { Course } from '@/features/courses/courses.types'
import { Card, RatingStars } from '@/shared/components/ui'
import { formatCurrency } from '@/shared/utils/formatCurrency'
import type { Locale } from '@/types/common.types'

const gradientByCategory: Record<string, string> = {
  aba: 'from-primary-500 to-primary-700',
  speech: 'from-hope-500 to-accent-600',
}

export function CourseCard({ course }: { course: Course }) {
  const { t } = useTranslation('courses')
  const { locale = 'ar' } = useParams<{ locale: string }>()

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <Card className="h-full">
        <Card.Media
          className={`flex items-center justify-center bg-gradient-to-br text-3xl font-bold text-white ${
            gradientByCategory[course.category] ?? 'from-primary-500 to-secondary-700'
          }`}
        >
          {t(course.title).charAt(0)}
        </Card.Media>
        <Card.Body>
          <h3 className="line-clamp-2 min-h-12 font-semibold text-neutral-900">
            {t(course.title)}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <RatingStars value={course.rating} />
            <span className="text-xs text-neutral-400">({course.reviewCount})</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-sm text-neutral-700">
            <Clock className="size-4" aria-hidden />
            {t('duration', { count: course.durationHours })}
          </div>
        </Card.Body>
        <Card.Footer>
          <span className="text-primary-700 text-lg font-bold">
            {formatCurrency(course.price, locale as Locale)}
          </span>
        </Card.Footer>
      </Card>
    </motion.div>
  )
}
