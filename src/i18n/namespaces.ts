export const NAMESPACES = [
  'common',
  'home',
  'about',
  'services',
  'courses',
  'trainers',
  'branches',
  'blog',
  'contact',
  'account',
] as const

export type Namespace = (typeof NAMESPACES)[number]
