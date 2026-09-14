import { apiClient } from '@/api/client'
import type { BlogPost } from '@/features/blog/blog.types'

export const blogApi = {
  getPosts: () => apiClient.get<BlogPost[]>('/blog'),
  getPostBySlug: (slug: string) => apiClient.get<BlogPost>(`/blog/${slug}`),
}
