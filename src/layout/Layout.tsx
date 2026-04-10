import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import styles from '../pages/dashboard.module.css'
import { getModuleNav, indexNavGroups } from '../app/navigation'
import { useLocation, useParams } from 'react-router-dom'

type LayoutProps = {
  children: ReactNode
  layoutType?: LayoutCode
}

type LayoutCode = 0 | 1 | 2 | 3

// Minimal wrapper used for public/auth screens (e.g., login) with no chrome
export const PlainLayout = ({ children }: LayoutProps) => <>{children}</>

const useLayoutState = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 960
      setIsMobile(mobile)
      setCollapsed(false)
      setMobileOpen(!mobile)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const initials = useMemo(() => 'KH', [])

  const handleMenuToggle = () => {
    if (isMobile) {
      setMobileOpen((prev) => !prev)
    } else {
      setCollapsed((prev) => !prev)
    }
  }

  return {
    collapsed,
    isMobile,
    mobileOpen,
    handleMenuToggle,
    initials,
  }
}

export const VerticalLeftLayout = ({ children }: LayoutProps) => {
  const location = useLocation()
  const { moduleId } = useParams()
  const moduleNav = getModuleNav(moduleId)
  const navGroups = moduleNav?.groups ?? indexNavGroups
  const moduleName = moduleNav?.name ?? (moduleId ? 'Unknown' : 'Dashboard')
  const { collapsed, isMobile, mobileOpen, handleMenuToggle, initials } = useLayoutState()

  return (
    <div className={styles.layoutRoot}>
      <Header onToggleMenu={handleMenuToggle} initials={initials} />
      <div className={styles.page}>
        <Sidebar
          collapsed={collapsed}
          isMobile={isMobile}
          mobileOpen={mobileOpen}
          onToggle={handleMenuToggle}
          moduleName={moduleName}
          navGroups={navGroups}
          key={location.pathname}
        />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  )
}

export const VerticalRightLayout = ({ children }: LayoutProps) => {
  const { collapsed, isMobile, mobileOpen, handleMenuToggle, initials } = useLayoutState()

  return (
    <div className={styles.layoutRoot}>
      <Header onToggleMenu={handleMenuToggle} initials={initials} />
      <div className={styles.page}>
        <main className={styles.content}>{children}</main>
        <Sidebar collapsed={collapsed} isMobile={isMobile} mobileOpen={mobileOpen} onToggle={handleMenuToggle} moduleName="" navGroups={indexNavGroups} />
      </div>
    </div>
  )
}

export const HorizontalLayout = ({ children }: LayoutProps) => {
  const { isMobile, mobileOpen, handleMenuToggle, initials } = useLayoutState()

  return (
    <div className={styles.layoutRoot}>
      <Header onToggleMenu={handleMenuToggle} initials={initials} />
      <div className={styles.page} style={{ flexDirection: 'column' }}>
        <Sidebar collapsed={false} isMobile={isMobile} mobileOpen={mobileOpen} onToggle={handleMenuToggle} moduleName="" navGroups={indexNavGroups} />
        <main className={styles.content} style={{ width: '100%' }}>
          {children}
        </main>
      </div>
    </div>
  )
}

export const DefaultLayout = ({ children }: LayoutProps) => {
  const { initials, handleMenuToggle } = useLayoutState()

  return (
    <div className={styles.layoutRoot}>
      <Header onToggleMenu={handleMenuToggle} initials={initials} />
      <div className={styles.page}>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  )
}

// Selector component to pick layout by numeric code:
// 0 => DefaultLayout (no sidebar)
// 1 => VerticalLeftLayout
// 2 => VerticalRightLayout
// 3 => HorizontalLayout
type LayoutSelectorProps = LayoutProps & { layoutType?: LayoutCode }

export const Layout = ({ children, layoutType = 1 }: LayoutSelectorProps) => {
  if (layoutType === 0) return <PlainLayout>{children}</PlainLayout>
  if (layoutType === 1) return <VerticalLeftLayout>{children}</VerticalLeftLayout>
  if (layoutType === 2) return <VerticalRightLayout>{children}</VerticalRightLayout>
  if (layoutType === 3) return <HorizontalLayout>{children}</HorizontalLayout>
  return <DefaultLayout>{children}</DefaultLayout>
}

export default Layout
