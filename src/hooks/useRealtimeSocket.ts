import { useEffect } from 'react'
import { socket } from '../socket/socket'
import { useAppDispatch } from '../app/hooks'
import { invalidateModules } from '../features/realtime/realtimeSlice'

type DataInvalidatedPayload = {
  modules: string[]
}

export const useRealtimeSocket = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!socket.connected) {
      socket.connect()
    }

    const handleInvalidation = (payload: DataInvalidatedPayload) => {
      if (!payload?.modules?.length) return
      dispatch(invalidateModules(payload.modules))
    }

    socket.on('DATA_INVALIDATED', handleInvalidation)

    return () => {
      socket.off('DATA_INVALIDATED', handleInvalidation)
      socket.disconnect()
    }
  }, [dispatch])
}
