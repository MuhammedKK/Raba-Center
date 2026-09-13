export interface Offer {
  id: string
  title: string
  description: string
  discountLabel: string
}

export interface Testimonial {
  id: string
  authorName: string
  authorRole: string
  quote: string
  rating: number
}

export interface Accreditation {
  id: string
  name: string
  initials: string
}
