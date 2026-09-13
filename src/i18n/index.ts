import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import arCommon from './locales/ar/common.json'
import arCourses from './locales/ar/courses.json'
import arHome from './locales/ar/home.json'
import enCommon from './locales/en/common.json'
import enCourses from './locales/en/courses.json'
import enHome from './locales/en/home.json'
import { NAMESPACES } from './namespaces'

const resources = {
  ar: { common: arCommon, home: arHome, courses: arCourses },
  en: { common: enCommon, home: enHome, courses: enCourses },
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
