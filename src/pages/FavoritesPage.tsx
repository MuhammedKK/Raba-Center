import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import { CourseCard } from '@/features/courses/components/CourseCard'
import { useCourses } from '@/features/courses/hooks/useCourses'
import { useFavoritesStore } from '@/features/favorites/store/useFavoritesStore'
import { Button } from '@/shared/components/ui'

export default function FavoritesPage() {
  const { t } = useTranslation('account')
  const { locale = 'ar' } = useParams<{ locale: string }>()
  const { courses } = useCourses()
  const favoriteIds = useFavoritesStore((state) => state.ids)
  const favoriteCourses = courses.filter((course) => favoriteIds.includes(course.id))

  if (favoriteCourses.length === 0) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">
        <p className="text-neutral-500">{t('favorites.empty')}</p>
        <Link to={`/${locale}/courses`}>
          <Button>{t('favorites.browse')}</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favoriteCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
