import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

type UserProfile = {
  name?: string
  email?: string
}

type AuthState = {
  accessToken: string | null
  user: UserProfile | null
}

const storedToken = localStorage.getItem('accessToken')
const storedUser = localStorage.getItem('userProfile')

const initialState: AuthState = {
  accessToken: storedToken,
  user: storedUser ? (JSON.parse(storedUser) as UserProfile) : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ token: string; user?: UserProfile }>) {
      state.accessToken = action.payload.token
      state.user = action.payload.user ?? null

      localStorage.setItem('accessToken', action.payload.token)
      if (action.payload.user) {
        localStorage.setItem('userProfile', JSON.stringify(action.payload.user))
      }
    },
    logout(state) {
      state.accessToken = null
      state.user = null

      localStorage.removeItem('accessToken')
      localStorage.removeItem('userProfile')
    },
  },
})

export const selectIsAuthenticated = (state: RootState) => Boolean(state.auth.accessToken)
export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
