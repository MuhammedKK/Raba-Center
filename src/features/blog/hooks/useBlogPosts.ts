import { useEffect, useState } from 'react'
import { blogApi } from '@/api/endpoints/blog.api'
import type { BlogPost } from '@/features/blog/blog.types'

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    blogApi
      .getPosts()
      .then((data) => {
        if (!cancelled) setPosts(data)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { posts, isLoading }
}
