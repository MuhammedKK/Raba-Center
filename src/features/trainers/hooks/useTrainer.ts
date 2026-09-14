import { useEffect, useState } from 'react'
import { trainersApi } from '@/api/endpoints/trainers.api'
import type { Trainer } from '@/features/trainers/trainers.types'

export function useTrainer(slug: string | undefined) {
  const [trainer, setTrainer] = useState<Trainer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    // Fetch-on-mount/dep-change with no query library in this stack (see PLAN.md);
    // resetting these here is intentional, not the "derived state" anti-pattern.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true)
    setNotFound(false)

    trainersApi
      .getTrainerBySlug(slug)
      .then((data) => {
        if (!cancelled) setTrainer(data)
      })
      .catch(() => {
        if (!cancelled) setNotFound(true)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return { trainer, isLoading, notFound }
}
