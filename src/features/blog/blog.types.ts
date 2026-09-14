export type BlogBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'image'; image: BlogPost['image']; caption?: string }
  | { type: 'quote'; text: string; attribution?: string }

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  category: 'earlyIntervention' | 'speechLanguage' | 'sensoryPlay' | 'parenting'
  image: 'earlyIntervention' | 'speechMilestones' | 'sensoryPlay' | 'familyReading'
  date: string
  readMinutes: number
  viewCount: number
  body: BlogBlock[]
}
