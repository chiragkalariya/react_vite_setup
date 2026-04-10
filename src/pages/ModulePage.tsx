import { useMemo } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { getModuleNav, modulePath } from '../app/navigation'
import styles from './dashboard.module.css'

type Params = {
  moduleId?: string
  '*': string
}

const ModulePage = () => {
  const params = useParams<Params>()
  const location = useLocation()
  const moduleId = params.moduleId ?? ''
  const moduleNav = useMemo(() => getModuleNav(moduleId), [moduleId])
  const activeLeaf = params['*']

  if (!moduleNav) {
    return (
      <div className={styles.page}>
        <div className={styles.hero}>
          <h2 className={styles.heroTitle}>Module not found</h2>
          <p className={styles.heroSubtitle}>The module &ldquo;{moduleId}&rdquo; does not exist.</p>
          <Link className={styles.chip} to={modulePath('')}>
            Back to dashboard
          </Link>
        </div>
      </div>
    )
  }

  const pathSegments = activeLeaf ? activeLeaf.split('/') : []
  const currentSection =
    moduleNav.groups
      .flatMap((g) => g.items)
      .find((item) => location.pathname.startsWith(item.path)) ?? null

  return (
    <div className={styles.page}>
      <div className={styles.hero} style={{ borderColor: moduleNav.accent ?? undefined }}>
        <h2 className={styles.heroTitle}>
          {moduleNav.icon} {moduleNav.name}
        </h2>
        <p className={styles.heroSubtitle}>{moduleNav.description}</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
          <Link className={styles.chip} to={modulePath(moduleNav.id)}>
            Module Home
          </Link>
          {moduleNav.groups.map((group) =>
            group.items.map((item) => (
              <Link key={item.path} className={styles.chip} to={item.path}>
                {item.icon} {item.label}
              </Link>
            )),
          )}
        </div>
      </div>

      <div className={styles.widget} style={{ marginTop: 16 }}>
        <div className={styles.widgetLabel}>Active path</div>
        <div className={styles.widgetValue}>{location.pathname}</div>
        {currentSection && (
          <div className={styles.widgetMeta}>
            {currentSection.icon} {currentSection.label}
          </div>
        )}
        {pathSegments.length > 0 && (
          <div className={styles.footer} style={{ marginTop: 8 }}>
            Wildcard segments: {pathSegments.join(' › ')}
          </div>
        )}
      </div>
    </div>
  )
}

export default ModulePage
