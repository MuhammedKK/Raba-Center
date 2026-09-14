import { Clock, Eye } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'

export function ReadTimeBadge({
  readMinutes,
  viewCount,
}: {
  readMinutes: number
  viewCount: number
}) {
  const { t } = useTranslation('blog')
  const { locale = 'ar' } = useParams<{ locale: string }>()
  const formattedViews = new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-SA').format(
    viewCount,
  )

  return (
    <div className="flex items-center gap-4 text-xs text-neutral-500">
      <span className="flex items-center gap-1">
        <Clock className="size-3.5" aria-hidden />
        {t('readTime', { count: readMinutes })}
      </span>
      <span className="flex items-center gap-1">
        <Eye className="size-3.5" aria-hidden />
        {t('viewCount', { formatted: formattedViews })}
      </span>
    </div>
  )
}
