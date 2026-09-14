import type { BlogPost } from '@/features/blog/blog.types'

export function getRelatedPosts(posts: BlogPost[], currentId: string, limit = 3): BlogPost[] {
  return posts
    .filter((post) => post.id !== currentId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}
