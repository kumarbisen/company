import { type FormEvent, useState } from "react"
import * as styles from "./AdminLogin.css"

/* ─── Hardcoded credentials ─────────────────────────────────
   Change these to whatever you prefer. Since this is a
   frontend-only project with no backend, credentials live here.
   ─────────────────────────────────────────────────────────── */
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "kunal@2025"

type Props = {
  onLogin: () => void
}

export function AdminLogin({ onLogin }: Props) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulate a brief network delay for realism
    setTimeout(() => {
      if (
        username.trim() === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
      ) {
        onLogin()
      } else {
        setError("Incorrect username or password. Please try again.")
        setLoading(false)
      }
    }, 700)
  }

  const hasError = error.length > 0

  return (
    <div className={styles.loginPage}>
      {/* decorative glow */}
      <div className={styles.loginGlow} />

      <div className={styles.loginCard}>
        {/* Brand */}
        <div className={styles.loginTop}>
          <div className={styles.loginBrandRow}>
            <a className={styles.loginBrand} href="/">KunalConnects</a>
            <span className={styles.loginBadge}>Admin</span>
          </div>
          <h1 className={styles.loginTitle}>Welcome back</h1>
          <p className={styles.loginSubtitle}>Sign in to access your admin dashboard.</p>
        </div>

        {/* Error banner */}
        {hasError && (
          <div className={styles.errorBanner} role="alert">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="7" stroke="#dc2626" strokeWidth="1.5" />
              <path d="M8 4.5v4" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="11" r="0.75" fill="#dc2626" />
            </svg>
            {error}
          </div>
        )}

        {/* Login form */}
        <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
          <label className={styles.fieldLabel}>
            Username
            <input
              id="admin-username"
              className={`${styles.fieldInput} ${hasError ? styles.fieldInputError : ""}`}
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError("") }}
              autoComplete="username"
              autoFocus
              required
              disabled={loading}
              placeholder="Enter your username"
            />
          </label>

          <label className={styles.fieldLabel}>
            Password
            <div className={styles.passwordWrap}>
              <input
                id="admin-password"
                className={`${styles.passwordInput} ${hasError ? styles.passwordInputError : ""}`}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError("") }}
                autoComplete="current-password"
                required
                disabled={loading}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className={styles.showHideBtn}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? (
                  /* Eye-off icon */
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M2 2l14 14M7.5 7.55A2 2 0 0110.45 10.5M5.3 5.32C3.68 6.3 2.4 7.8 1.5 9c1.5 2.5 4.2 5 7.5 5a7.3 7.3 0 003.7-1.02M12.7 12.68C14.32 11.7 15.6 10.2 16.5 9 15 6.5 12.3 4 9 4a7.3 7.3 0 00-3.7 1.02" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                ) : (
                  /* Eye icon */
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M1.5 9C3 6.5 5.7 4 9 4s6 2.5 7.5 5c-1.5 2.5-4.2 5-7.5 5S3 11.5 1.5 9z" stroke="currentColor" strokeWidth="1.4" />
                    <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                )}
              </button>
            </div>
          </label>

          <button
            id="admin-login-submit"
            type="submit"
            className={`${styles.submitBtn} ${loading ? styles.submitBtnLoading : ""}`}
            disabled={loading || !username || !password}
          >
            {loading ? (
              <>
                <span className={styles.spinner} />
                Signing in…
              </>
            ) : (
              <>
                Sign in
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
        </form>

        <p className={styles.hint}>
          Not an admin?{" "}
          <a className={styles.hintLink} href="/">Back to site</a>
        </p>
      </div>
    </div>
  )
}
