import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import earlyInterventionImage from '@/assets/images/blog/blog-early-intervention.jpg'
import familyReadingImage from '@/assets/images/blog/blog-family-support.jpg'
import sensoryPlayImage from '@/assets/images/blog/blog-sensory-play.jpg'
import speechMilestonesImage from '@/assets/images/blog/blog-speech-milestones.jpg'
import type { BlogPost } from '@/features/blog/blog.types'
import { getRelatedPosts } from '@/features/blog/blog.utils'
import { BlogBlockRenderer } from '@/features/blog/components/BlogBlockRenderer'
import { BlogCard } from '@/features/blog/components/BlogCard'
import { ReadTimeBadge } from '@/features/blog/components/ReadTimeBadge'
import { useBlogPost } from '@/features/blog/hooks/useBlogPost'
import { useBlogPosts } from '@/features/blog/hooks/useBlogPosts'
import { Skeleton } from '@/shared/components/ui'
import { formatDate } from '@/shared/utils/formatDate'
import type { Locale } from '@/types/common.types'

const imageByPost: Record<BlogPost['image'], string> = {
  earlyIntervention: earlyInterventionImage,
  speechMilestones: speechMilestonesImage,
  sensoryPlay: sensoryPlayImage,
  familyReading: familyReadingImage,
}

export default function BlogDetailPage() {
  const { t } = useTranslation('blog')
  const { slug, locale = 'ar' } = useParams<{ slug: string; locale: string }>()
  const { post, isLoading, notFound } = useBlogPost(slug)
  const { posts } = useBlogPosts()

  if (notFound) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          {t('detail.notFound')}
        </h1>
        <Link
          to={`/${locale}/blog`}
          className="text-primary-600 dark:text-primary-400 mt-4 inline-block font-semibold"
        >
          {t('list.eyebrow')}
        </Link>
      </div>
    )
  }

  if (isLoading || !post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Skeleton className="h-72 w-full" />
      </div>
    )
  }

  const relatedPosts = getRelatedPosts(posts, post.id)

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <span className="text-primary-600 text-xs font-semibold tracking-wide uppercase">
        {t(`filter.${post.category}`)}
      </span>
      <h1 className="mt-2 text-3xl font-extrabold text-neutral-900 dark:text-neutral-50">
        {t(post.title)}
      </h1>

      <div className="mt-4 flex items-center gap-4">
        <p className="text-sm text-neutral-400">{formatDate(post.date, locale as Locale)}</p>
        <ReadTimeBadge readMinutes={post.readMinutes} viewCount={post.viewCount} />
      </div>

      <img
        src={imageByPost[post.image]}
        alt=""
        aria-hidden
        className="mt-8 aspect-video w-full rounded-2xl object-cover"
      />

      <div className="mt-2">
        <BlogBlockRenderer body={post.body} />
      </div>

      {relatedPosts.length > 0 && (
        <div className="mt-16 border-t border-neutral-200 pt-10 dark:border-neutral-800">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
            {t('detail.relatedPosts')}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
