export const routePaths = {
  home: '',
  about: 'about',
  services: 'services',
  courses: 'courses',
  courseDetail: (slug = ':slug') => `courses/${slug}`,
  trainers: 'trainers',
  trainerDetail: (slug = ':slug') => `trainers/${slug}`,
  branches: 'branches',
  blog: 'blog',
  blogDetail: (slug = ':slug') => `blog/${slug}`,
  contact: 'contact',
  login: 'login',
  favorites: 'favorites',
  cart: 'cart',
  checkout: 'checkout',
  profile: 'profile',
} as const

export function localizedPath(locale: string, path: string) {
  return `/${locale}${path ? `/${path}` : ''}`
}
