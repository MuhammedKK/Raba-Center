import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import arAbout from './locales/ar/about.json'
import arAccount from './locales/ar/account.json'
import arBlog from './locales/ar/blog.json'
import arBranches from './locales/ar/branches.json'
import arCommon from './locales/ar/common.json'
import arContact from './locales/ar/contact.json'
import arCourses from './locales/ar/courses.json'
import arHome from './locales/ar/home.json'
import arServices from './locales/ar/services.json'
import arTrainers from './locales/ar/trainers.json'
import enAbout from './locales/en/about.json'
import enAccount from './locales/en/account.json'
import enBlog from './locales/en/blog.json'
import enBranches from './locales/en/branches.json'
import enCommon from './locales/en/common.json'
import enContact from './locales/en/contact.json'
import enCourses from './locales/en/courses.json'
import enHome from './locales/en/home.json'
import enServices from './locales/en/services.json'
import enTrainers from './locales/en/trainers.json'
import { NAMESPACES } from './namespaces'

const resources = {
  ar: {
    common: arCommon,
    home: arHome,
    courses: arCourses,
    about: arAbout,
    services: arServices,
    trainers: arTrainers,
    account: arAccount,
    branches: arBranches,
    blog: arBlog,
    contact: arContact,
  },
  en: {
    common: enCommon,
    home: enHome,
    courses: enCourses,
    about: enAbout,
    services: enServices,
    trainers: enTrainers,
    account: enAccount,
    branches: enBranches,
    blog: enBlog,
    contact: enContact,
  },
} as const

export function applyDirection(language: string) {
  const dir = language === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.dir = dir
  document.documentElement.lang = language
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    ns: NAMESPACES,
    defaultNS: 'common',
    fallbackLng: 'ar',
    supportedLngs: ['ar', 'en'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },
  })
  .then(() => applyDirection(i18n.language))

i18n.on('languageChanged', applyDirection)

export default i18n
