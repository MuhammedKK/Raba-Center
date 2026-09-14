export interface TeamMember {
  id: string
  name: string
  role: string
  credentials: string
  specialty: string
  bio: string
  photo: 'lead' | 'behavior' | 'speech' | 'occupational'
}

export interface ValueItem {
  id: string
  title: string
  description: string
}
