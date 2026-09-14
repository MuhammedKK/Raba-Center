export interface Course {
  id: string
  slug: string
  title: string
  description: string
  category: string
  price: number
  rating: number
  reviewCount: number
  durationHours: number
  image: 'aba' | 'supervisor' | 'specialist' | 'speech'
  trainerId: string
  curriculum: string[]
}

export interface CourseFilters {
  category?: string
  maxPrice?: number
}
