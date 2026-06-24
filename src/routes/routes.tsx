import type { ComponentType, ReactNode } from 'react'
import DashboardPage from '../pages/DashboardPage'
import LoginPage from '../pages/LoginPage'
import UsersPage from '../pages/UsersPage'
import MasterModulePage from '../pages/MasterModulePage'
import DesignModulePage from '../pages/DesignModulePage'
import ProductionModulePage from '../pages/ProductionModulePage'
import { modulePath } from '../app/navigation'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import { AppPaths } from './paths'

export type RouteConfig = {
  id: string
  path: string
  Component: ComponentType
  Guard: ComponentType<{ children: ReactNode }>
  layoutType?: 0 | 1 | 2 | 3
}

export const routes: RouteConfig[] = [
  {
    id: 'login',
    path: AppPaths.login,
    Component: LoginPage,
    Guard: PublicRoute,
    layoutType: 0,
  },
  {
    id: 'dashboard',
    path: AppPaths.dashboard,
    Component: DashboardPage,
    Guard: ProtectedRoute,
    layoutType: 1,
  },
  {
    id: 'users',
    path: AppPaths.users,
    Component: UsersPage,
    Guard: ProtectedRoute,
    layoutType: 1,
  },
  // Static module routes (examples) pointing to module-aware component
  {
    id: 'master',
    path: modulePath('master'),
    Component: MasterModulePage,
    Guard: ProtectedRoute,
    layoutType: 1,
  },
  {
    id: 'design',
    path: modulePath('design'),
    Component: DesignModulePage,
    Guard: ProtectedRoute,
    layoutType: 1,
  },
  {
    id: 'production',
    path: modulePath('production'),
    Component: ProductionModulePage,
    Guard: ProtectedRoute,
    layoutType: 1,
  },
]
