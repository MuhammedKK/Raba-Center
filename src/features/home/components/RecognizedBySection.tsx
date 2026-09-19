import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import bacbLogo from '@/assets/images/recognized/bacb.jpeg'
import cbahiLogo from '@/assets/images/recognized/cbahi.jpeg'
import councilOfHealthInsuranceLogo from '@/assets/images/recognized/council-of-health-insurance.jpeg'
import ibaoLogo from '@/assets/images/recognized/ibao.jpeg'
import isoLogo from '@/assets/images/recognized/iso.jpeg'
import qabaLogo from '@/assets/images/recognized/qaba.jpeg'
import { AnimatedSection } from '@/shared/components/composed/AnimatedSection'
import { SectionHeading } from '@/shared/components/composed/SectionHeading'
import { useScrollReveal } from '@/shared/hooks/useScrollReveal'

/**
 * The bodies that certify/accredit the center, shown as their own marks. Names
 * are read off each supplied logo, so `alt` stays accurate without inventing
 * anything the artwork doesn't already say.
 */
const recognitions = [
  { id: 'cbahi', logo: cbahiLogo, nameKey: 'recognized.items.cbahi' },
  {
    id: 'council-of-health-insurance',
    logo: councilOfHealthInsuranceLogo,
    nameKey: 'recognized.items.councilOfHealthInsurance',
  },
  { id: 'bacb', logo: bacbLogo, nameKey: 'recognized.items.bacb' },
  { id: 'qaba', logo: qabaLogo, nameKey: 'recognized.items.qaba' },
  { id: 'ibao', logo: ibaoLogo, nameKey: 'recognized.items.ibao' },
  { id: 'iso', logo: isoLogo, nameKey: 'recognized.items.iso' },
] as const

export function RecognizedBySection() {
  const { t } = useTranslation('home')
  const { ref, isInView } = useScrollReveal()

  return (
    <AnimatedSection className="bg-neutral-50/50 py-20 backdrop-blur-sm dark:bg-neutral-900/40">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          align="center"
          eyebrow={t('recognized.eyebrow')}
          title={t('recognized.title')}
        />

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6 lg:gap-6">
          {recognitions.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Every mark ships on light artwork, so the tile stays light in both
                  themes — on a dark surface each logo would read as a bright box. */}
              <div className="group flex aspect-4/3 items-center justify-center rounded-2xl bg-white p-3 shadow-sm ring-1 ring-neutral-200/80 transition-shadow duration-300 hover:shadow-md sm:p-4 dark:ring-neutral-700/60">
                <img
                  src={item.logo}
                  alt={t(item.nameKey)}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  )
}
