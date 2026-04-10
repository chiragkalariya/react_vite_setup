import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '../features/ui/uiSlice'
import authReducer from '../features/auth/authSlice'
import realtimeReducer from '../features/realtime/realtimeSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    realtime: realtimeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
