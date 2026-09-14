export interface Trainer {
  id: string
  slug: string
  name: string
  role: string
  bio: string
  /** Only set when the source data explicitly lists qualifications/certifications for this trainer. */
  qualifications?: string
  /** Only set when the source data explicitly states years of experience for this trainer. */
  experience?: string
  /** Rating out of 5, as shown on the source trainer listing. */
  rating?: number
  photo: 'hanaa' | 'ahmed' | 'hisham' | 'doha'
}
