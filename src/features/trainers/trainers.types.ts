export interface Trainer {
  id: string
  slug: string
  name: string
  role: string
  credentials: string
  specialty: string
  bio: string
  photo: 'lead' | 'behavior' | 'speech' | 'occupational'
}
