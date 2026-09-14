import { CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function CourseCurriculumList({ modules }: { modules: string[] }) {
  const { t } = useTranslation('courses')

  return (
    <ul className="space-y-3">
      {modules.map((moduleKey) => (
        <li key={moduleKey} className="flex items-start gap-3">
          <CheckCircle2 className="text-primary-500 mt-0.5 size-5 shrink-0" aria-hidden />
          <span className="text-neutral-700">{t(moduleKey)}</span>
        </li>
      ))}
    </ul>
  )
}
