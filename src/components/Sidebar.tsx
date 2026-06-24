import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { NavGroup, NavItem } from '../app/navigation'
import styles from '../pages/dashboard.module.css'

type SidebarProps = {
  collapsed: boolean
  isMobile: boolean
  mobileOpen: boolean
  onToggle: () => void
  moduleName?: string
  navGroups: NavGroup[]
}

const isPathActive = (pathname: string, path: string) =>
  pathname === path || pathname.startsWith(`${path}/`)

const hasActiveChild = (pathname: string, item: NavItem) =>
  item.children?.some((child) => isPathActive(pathname, child.path)) ?? false

const Sidebar = ({ collapsed, isMobile, mobileOpen, onToggle, moduleName, navGroups }: SidebarProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())

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

  useEffect(() => {
    const next = new Set<string>()
    navGroups.forEach((section) => {
      section.items.forEach((item) => {
        if (item.children && hasActiveChild(location.pathname, item)) {
          next.add(item.label)
        }
      })
    })
    if (next.size > 0) {
      setExpandedGroups((prev) => new Set([...prev, ...next]))
    }
  }, [location.pathname, navGroups])

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(label)) {
        next.delete(label)
      } else {
        next.add(label)
      }
      return next
    })
  }

  const handleNavigate = (path: string) => {
    navigate(path)
    if (isMobile) onToggle()
  }

  const renderNavItem = (item: NavItem, isChild = false) => {
    if (item.children?.length) {
      const isExpanded = expandedGroups.has(item.label)
      const isGroupActive = hasActiveChild(location.pathname, item)

      return (
        <li key={item.label} className={styles.navGroup}>
          <div
            className={`${styles.navItem} ${styles.navItemGroup} ${isGroupActive ? styles.navItemActive : ''}`}
            onClick={() => toggleGroup(item.label)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                toggleGroup(item.label)
              }
            }}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
            <span className={styles.chevron} aria-hidden="true">
              {isExpanded ? '▾' : '▸'}
            </span>
          </div>
          {isExpanded ? (
            <ul className={styles.navChildren}>
              {item.children.map((child) => renderNavItem(child, true))}
            </ul>
          ) : null}
        </li>
      )
    }

    const isActive = isPathActive(location.pathname, item.path)

    return (
      <li
        key={item.path}
        className={`${styles.navItem} ${isChild ? styles.navItemChild : ''} ${isActive ? styles.navItemActive : ''}`}
        onClick={() => handleNavigate(item.path)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            handleNavigate(item.path)
          }
        }}
      >
        <span className={styles.icon}>{item.icon}</span>
        <span className={styles.label}>{item.label}</span>
      </li>
    )
  }

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
              {section.items.map((item) => renderNavItem(item))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
