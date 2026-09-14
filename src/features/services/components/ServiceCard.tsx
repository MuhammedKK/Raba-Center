import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Brain, Home, MapPin, MessageCircle, UserCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'
import type { Service } from '@/features/services/services.types'
import { useDirection } from '@/shared/hooks/useDirection'

const iconByService: Record<Service['icon'], typeof Brain> = {
  aba: Brain,
  speech: MessageCircle,
  assessment: UserCheck,
  home: Home,
  shadow: UserCheck,
  branches: MapPin,
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { t } = useTranslation('services')
  const { locale } = useParams<{ locale: string }>()
  const direction = useDirection()
  const Icon = iconByService[service.icon]
  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none"
    >
      <span className="from-primary-500 to-accent-500 mb-5 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white">
        <Icon className="size-7" aria-hidden />
      </span>
      <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50">{t(service.title)}</h3>
      <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-400">{t(service.description)}</p>
      <Link
        to={`/${locale}/contact?service=${service.id}`}
        className="text-primary-600 dark:text-primary-400 mt-5 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
      >
        {t('cta.label')}
        <ArrowIcon
          className="size-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
          aria-hidden
        />
      </Link>
    </motion.div>
  )
}
