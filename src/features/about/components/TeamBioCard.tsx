import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import behaviorImage from '@/assets/images/team/team-behavior.jpg'
import leadImage from '@/assets/images/team/team-lead.jpg'
import occupationalImage from '@/assets/images/team/team-occupational.jpg'
import speechImage from '@/assets/images/team/team-speech.jpg'
import type { TeamMember } from '@/features/about/about.types'
import { Card, Modal } from '@/shared/components/ui'

const imageByMember: Record<TeamMember['photo'], string> = {
  lead: leadImage,
  behavior: behaviorImage,
  speech: speechImage,
  occupational: occupationalImage,
}

export function TeamBioCard({ member }: { member: TeamMember }) {
  const { t } = useTranslation('about')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Card className="h-full">
          <Card.Media>
            <img
              src={imageByMember[member.photo]}
              alt=""
              aria-hidden
              className="size-full object-cover"
              loading="lazy"
            />
          </Card.Media>
          <Card.Body>
            <h3 className="font-bold text-neutral-900 dark:text-neutral-50">{t(member.name)}</h3>
            <p className="text-primary-700 dark:text-primary-300 mt-1 text-sm font-semibold">
              {t(member.role)}
            </p>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              {t(member.credentials)}
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="text-primary-600 dark:text-primary-400 mt-4 text-sm font-semibold hover:underline"
            >
              {t('team.readBio')}
            </button>
          </Card.Body>
        </Card>
      </motion.div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={t(member.name)}>
        <p className="text-primary-700 dark:text-primary-300 text-sm font-semibold">
          {t(member.role)}
        </p>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {t(member.credentials)}
        </p>
        <p className="mt-4 text-sm font-semibold text-neutral-900 dark:text-neutral-50">
          {t(member.specialty)}
        </p>
        <p className="mt-3 text-neutral-700 dark:text-neutral-400">{t(member.bio)}</p>
      </Modal>
    </>
  )
}
