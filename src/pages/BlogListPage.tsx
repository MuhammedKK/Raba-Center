import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BlogCard } from '@/features/blog/components/BlogCard'
import { BlogFilterBar } from '@/features/blog/components/BlogFilterBar'
import { useBlogPosts } from '@/features/blog/hooks/useBlogPosts'
import { SectionHeading } from '@/shared/components/composed/SectionHeading'

export default function BlogListPage() {
  const { t } = useTranslation('blog')
  const { posts } = useBlogPosts()
  const [category, setCategory] = useState('all')

  const filteredPosts =
    category === 'all' ? posts : posts.filter((post) => post.category === category)

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow={t('list.eyebrow')} title={t('list.title')} />

      <div className="mb-8">
        <BlogFilterBar value={category} onChange={setCategory} />
      </div>

      {filteredPosts.length === 0 ? (
        <p className="py-16 text-center text-neutral-500 dark:text-neutral-400">{t('list.empty')}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
