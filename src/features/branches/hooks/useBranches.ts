import { useEffect, useState } from 'react'
import { branchesApi } from '@/api/endpoints/branches.api'
import type { Branch } from '@/features/branches/branches.types'

export function useBranches() {
  const [branches, setBranches] = useState<Branch[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    branchesApi
      .getBranches()
      .then((data) => {
        if (!cancelled) setBranches(data)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { branches, isLoading }
}
