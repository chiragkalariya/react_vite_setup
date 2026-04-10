import { useEffect, useRef } from 'react'
import { useQueryClient, type QueryKey } from '@tanstack/react-query'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { clearInvalidate } from '../features/realtime/realtimeSlice'
type RefetchOnInvalidateOptions = {
  additionalQueryKeys?: QueryKey[]
  refetchType?: 'all' | 'active' | 'inactive' | 'none'
}

export const useRefetchOnInvalidate = (
  moduleKey: string,
  queryKey: QueryKey,
  options?: RefetchOnInvalidateOptions,
) => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const invalidated = useAppSelector((state) => Boolean(state.realtime.invalidate[moduleKey]))
  const fetchingRef = useRef(false)

  useEffect(() => {
    if (!invalidated || fetchingRef.current) return

    fetchingRef.current = true

    const keys = [queryKey, ...(options?.additionalQueryKeys ?? [])]
    const refetchType = options?.refetchType ?? 'active'

    const run = async () => {
      try {
        await Promise.all(
          keys.map((key) => queryClient.invalidateQueries({ queryKey: key, refetchType })),
        )
      } finally {
        fetchingRef.current = false
        dispatch(clearInvalidate(moduleKey))
      }
    }

    void run()
  }, [
    dispatch,
    invalidated,
    moduleKey,
    options?.additionalQueryKeys,
    options?.refetchType,
    queryClient,
    queryKey,
  ])
}
