import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type UIState = {
  selectedUserId: number | null
  compactCards: boolean
}

const initialState: UIState = {
  selectedUserId: null,
  compactCards: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    selectUser(state, action: PayloadAction<number | null>) {
      state.selectedUserId = action.payload
    },
    toggleDensity(state) {
      state.compactCards = !state.compactCards
    },
  },
})

export const { selectUser, toggleDensity } = uiSlice.actions
export default uiSlice.reducer
