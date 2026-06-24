import type { FormEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, type Location } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectIsAuthenticated, setCredentials } from '../features/auth/authSlice'
import { AppPaths } from '../routes/paths'
import { apiClient } from '../api/client'
import styles from './login.module.css'

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles.eyeIcon}>
    <path
      d="M2.5 12s3.4-7 9.5-7 9.5 7 9.5 7-3.4 7-9.5 7-9.5-7-9.5-7Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    {open ? null : (
      <path d="M4 20 20 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    )}
  </svg>
)

const LoginPage = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const nextPath = useMemo(() => {
    const fromState = location.state as { from?: Location } | null
    return fromState?.from?.pathname ?? AppPaths.dashboard
  }, [location.state])

  useEffect(() => {
    if (isAuthenticated) {
      navigate(AppPaths.dashboard, { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email.trim() || !password) {
      setMessage('Please enter your email and password.')
      return
    }

    setBusy(true)
    setMessage(null)

    try {
      const { data } = await apiClient.post('/api/auth/login', { email, password })
      const user = data?.user

      dispatch(
        setCredentials({
          token: 'cookie',
          user: {
            name: user?.name ?? email,
            email: user?.email ?? email,
          },
        }),
      )
      navigate(nextPath, { replace: true })
    } catch (error: unknown) {
      const err = error as { message?: string }
      setMessage(err?.message ?? 'Invalid email or password.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.panel}>
          <div className={styles.brand}>
            <div className={styles.logoMark}>KH</div>
            <p className={styles.brandSub}>Kohira Next · Admin Workspace</p>
          </div>
          <h1 className={styles.title}>Sign in</h1>
          <p className={styles.subtitle}>Enter your email and password to access the dashboard.</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>
              Email
              <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={busy}
              />
            </label>

            <label className={styles.label}>
              Password
              <span className={styles.passwordWrap}>
                <input
                  className={styles.input}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={busy}
                />

                <button
                  className={styles.eyeButton}
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </span>
            </label>

            <button className={styles.primary} type="submit" disabled={busy}>
              {busy ? 'Signing in...' : 'Sign in'}
            </button>

            <a className={styles.forgot} href="#" onClick={(event) => event.preventDefault()}>
              Forgot password?
            </a>
          </form>

          <div className={styles.meta} aria-live="polite">
            {message ? <p className={styles.message}>{message}</p> : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
