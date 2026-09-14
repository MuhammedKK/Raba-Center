import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CourseCard } from '@/features/courses/components/CourseCard'
import { CourseFilterBar } from '@/features/courses/components/CourseFilterBar'
import { filterCourses } from '@/features/courses/courses.utils'
import { useCourseFilters } from '@/features/courses/hooks/useCourseFilters'
import { useCourses } from '@/features/courses/hooks/useCourses'
import { SectionHeading } from '@/shared/components/composed/SectionHeading'

export default function CoursesListPage() {
  const { t } = useTranslation('courses')
  const { courses } = useCourses()
  const { filters, setCategory, setMaxPrice } = useCourseFilters()
  const filteredCourses = filterCourses(courses, filters)

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow={t('list.eyebrow')} title={t('list.title')} />

      <CourseFilterBar
        filters={filters}
        onCategoryChange={setCategory}
        onMaxPriceChange={setMaxPrice}
      />

      {filteredCourses.length === 0 ? (
        <p className="py-16 text-center text-neutral-500 dark:text-neutral-400">{t('list.empty')}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
