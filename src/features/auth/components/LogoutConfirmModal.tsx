import { useTranslation } from 'react-i18next'
import { Button, Modal } from '@/shared/components/ui'

interface LogoutConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function LogoutConfirmModal({ isOpen, onClose, onConfirm }: LogoutConfirmModalProps) {
  const { t } = useTranslation()

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('account.logoutConfirmTitle')}>
      <p className="text-neutral-700 dark:text-neutral-300">{t('account.logoutConfirmMessage')}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          {t('actions.cancel')}
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onConfirm()
            onClose()
          }}
        >
          {t('actions.confirm')}
        </Button>
      </div>
    </Modal>
  )
}
