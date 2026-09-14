export type OfferLink = { type: 'course'; courseId: string } | { type: 'contact'; service: string }

export interface Offer {
  id: string
  title: string
  description: string
  discountLabel: string
  image: 'aba' | 'homeServices' | 'trainingBundle'
  link: OfferLink
  /** Percent knocked off the linked course's price, applied in cart/checkout. Absent for non-course offers. */
  discountPercent?: number
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
