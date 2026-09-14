import { useEffect, useState } from 'react'
import { trainersApi } from '@/api/endpoints/trainers.api'
import type { Trainer } from '@/features/trainers/trainers.types'

export function useTrainers() {
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    trainersApi
      .getTrainers()
      .then((data) => {
        if (!cancelled) setTrainers(data)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { trainers, isLoading }
}
