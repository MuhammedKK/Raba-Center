import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import { ReadTimeBadge } from './ReadTimeBadge'
import earlyInterventionImage from '@/assets/images/blog/blog-early-intervention.jpg'
import familyReadingImage from '@/assets/images/blog/blog-family-support.jpg'
import sensoryPlayImage from '@/assets/images/blog/blog-sensory-play.jpg'
import speechMilestonesImage from '@/assets/images/blog/blog-speech-milestones.jpg'
import type { BlogPost } from '@/features/blog/blog.types'
import { Card } from '@/shared/components/ui'
import { formatDate } from '@/shared/utils/formatDate'
import type { Locale } from '@/types/common.types'

const imageByPost: Record<BlogPost['image'], string> = {
  earlyIntervention: earlyInterventionImage,
  speechMilestones: speechMilestonesImage,
  sensoryPlay: sensoryPlayImage,
  familyReading: familyReadingImage,
}

export function BlogCard({ post }: { post: BlogPost }) {
  const { t } = useTranslation('blog')
  const { locale = 'ar' } = useParams<{ locale: string }>()

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <Link to={`/${locale}/blog/${post.slug}`}>
        <Card className="h-full">
          <Card.Media>
            <img
              src={imageByPost[post.image]}
              alt=""
              aria-hidden
              className="size-full object-cover"
              loading="lazy"
            />
          </Card.Media>
          <Card.Body>
            <span className="text-primary-600 text-xs font-semibold tracking-wide uppercase">
              {t(`filter.${post.category}`)}
            </span>
            <h3 className="mt-1 line-clamp-2 font-semibold text-neutral-900">{t(post.title)}</h3>
            <p className="mt-2 line-clamp-2 text-sm text-neutral-500">{t(post.excerpt)}</p>
            <p className="mt-3 text-xs text-neutral-400">
              {formatDate(post.date, locale as Locale)}
            </p>
            <div className="mt-3">
              <ReadTimeBadge readMinutes={post.readMinutes} viewCount={post.viewCount} />
            </div>
          </Card.Body>
        </Card>
      </Link>
    </motion.div>
  )
}
