import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectIsAuthenticated } from '../features/auth/authSlice'
import { AppPaths } from './paths'

type Props = {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={AppPaths.login} state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
