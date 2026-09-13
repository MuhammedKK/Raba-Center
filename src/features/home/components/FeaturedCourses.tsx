import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import { CourseCard } from '@/features/courses/components/CourseCard'
import type { Course } from '@/features/courses/courses.types'
import { AnimatedSection } from '@/shared/components/composed/AnimatedSection'
import { SectionHeading } from '@/shared/components/composed/SectionHeading'
import { Button } from '@/shared/components/ui'

export function FeaturedCourses({ courses }: { courses: Course[] }) {
  const { t } = useTranslation('home')
  const { locale } = useParams<{ locale: string }>()

  if (courses.length === 0) return null

  return (
    <AnimatedSection className="bg-neutral-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow={t('courses.eyebrow')}
            title={t('courses.title')}
            className="mb-0"
          />
          <Link to={`/${locale}/courses`}>
            <Button variant="ghost">{t('courses.viewAll')}</Button>
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
