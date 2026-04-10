import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { NavGroup } from '../app/navigation'
import styles from '../pages/dashboard.module.css'

type SidebarProps = {
  collapsed: boolean
  isMobile: boolean
  mobileOpen: boolean
  onToggle: () => void
  moduleName?: string
  navGroups: NavGroup[]
}

const Sidebar = ({ collapsed, isMobile, mobileOpen, onToggle, moduleName, navGroups }: SidebarProps) => {
  const location = useLocation()
  const navigate = useNavigate()

  const sidebarClasses = useMemo(
    () =>
      [
        styles.sidebar,
        collapsed && !isMobile ? styles.collapsed : '',
        isMobile && mobileOpen ? styles.open : '',
      ]
        .filter(Boolean)
        .join(' '),
    [collapsed, isMobile, mobileOpen],
  )

  return (
    <aside className={sidebarClasses}>
      <div className={styles.brand}>
        <div className={styles.brandMark}>{moduleName?.[0] ?? 'N'}</div>
        <div className={styles.brandText}>{moduleName ?? 'Navigation'}</div>
      </div>

      <div className={styles.sections}>
        {navGroups.map((section) => (
          <div key={section.title}>
            <p className={styles.sectionTitle}>{section.title}</p>
            <ul className={styles.nav}>
              {section.items.map((item) => {
                const isActive =
                  location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
                return (
                  <li
                    key={item.path}
                    className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                    onClick={() => {
                      navigate(item.path)
                      if (isMobile) onToggle()
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        navigate(item.path)
                        if (isMobile) onToggle()
                      }
                    }}
                  >
                    <span className={styles.icon}>{item.icon}</span>
                    <span className={styles.label}>{item.label}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
