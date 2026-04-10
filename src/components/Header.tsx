import type { ReactNode } from 'react'
import styles from '../pages/dashboard.module.css'

type HeaderProps = {
  onToggleMenu: () => void
  initials?: string
  rightActions?: ReactNode
}

const Header = ({ onToggleMenu, initials = 'KH', rightActions }: HeaderProps) => {
  return (
    <header className={styles.headerBar}>
      <div className={styles.team}>
        <button className={styles.menuBtn} type="button" onClick={onToggleMenu} aria-label="Toggle sidebar">
          ☰
        </button>
        <img className={styles.headerLogo} src="/vite.svg" alt="Kohira Next" />
      </div>
      <div className={styles.actionsRow}>
        {rightActions ?? (
          <>
            <button className={styles.chip} type="button">
              🔎 Search
            </button>
            <button className={styles.chip} type="button">
              🔔 Alerts
            </button>
            <div className={styles.avatarRing}>
              <div className={styles.avatarInner}>{initials}</div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
