import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type RealtimeState = {
  invalidate: Record<string, boolean>
}

const initialState: RealtimeState = {
  invalidate: {
    users: false,
    stock: false,
    gold: false,
    ledger: false,
  },
}

const realtimeSlice = createSlice({
  name: 'realtime',
  initialState,
  reducers: {
    invalidateModules: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach((moduleKey) => {
        state.invalidate[moduleKey] = true
      })
    },
    clearInvalidate: (state, action: PayloadAction<string>) => {
      state.invalidate[action.payload] = false
    },
  },
})

export const { invalidateModules, clearInvalidate } = realtimeSlice.actions

export default realtimeSlice.reducer
