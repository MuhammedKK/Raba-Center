import { useEffect, useState } from 'react'
import { blogApi } from '@/api/endpoints/blog.api'
import type { BlogPost } from '@/features/blog/blog.types'

export function useBlogPost(slug: string | undefined) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    // Fetch-on-mount/dep-change with no query library in this stack (see PLAN.md);
    // resetting these here is intentional, not the "derived state" anti-pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true)
    setNotFound(false)

    blogApi
      .getPostBySlug(slug)
      .then((data) => {
        if (!cancelled) setPost(data)
      })
      .catch(() => {
        if (!cancelled) setNotFound(true)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return { post, isLoading, notFound }
}
