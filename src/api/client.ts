import axios from 'axios'
import { AppPaths } from '../routes/paths'
import { store } from '../app/store'
import { logout } from '../features/auth/authSlice'

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000'

export const apiClient = axios.create({
  baseURL,
  timeout: 8000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
})

const redirectToLogin = () => {
  if (typeof window === 'undefined') return
  const loginPath = AppPaths.login || '/login'
  if (window.location.pathname !== loginPath) {
    window.location.replace(loginPath)
  }
}

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token && token !== 'cookie') {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status

    if (status === 401 || status === 440) {
      store.dispatch(logout())
      redirectToLogin()
    } else if (status === 400 || status === 409) {
      console.warn('Request failed', error?.response?.data ?? error?.message)
    } else if (status === 500) {
      console.error('Server error encountered.', error?.response?.data ?? error?.message)
    }

    return Promise.reject(error?.response?.data ?? error?.message ?? 'Unexpected error occurred')
  },
)
