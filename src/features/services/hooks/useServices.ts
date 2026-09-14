import { useEffect, useState } from 'react'
import { servicesApi } from '@/api/endpoints/services.api'
import type { Service } from '@/features/services/services.types'

export function useServices() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    servicesApi
      .getServices()
      .then((data) => {
        if (!cancelled) setServices(data)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { services, isLoading }
}
