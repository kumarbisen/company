import { type FormEvent, useState } from "react"
import { apiUrl } from "../../data/api"
import { ArrowRightIcon, ErrorAlertIcon, EyeIcon, EyeOffIcon } from "../../styles/Icons"
import * as styles from "./AdminLogin.css"

type Props = {
  onLogin: (token: string) => void
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

    fetch(apiUrl("/api/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Incorrect username or password. Please try again.")
        return res.json()
      })
      .then((data) => {
        if (data.token) {
          onLogin(data.token)
        } else {
          throw new Error("Invalid server response")
        }
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
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
            <ErrorAlertIcon width={16} height={16} style={{ color: "#dc2626" }} />
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
                {showPassword ? <EyeOffIcon width={18} height={18} /> : <EyeIcon width={18} height={18} />}
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
                <ArrowRightIcon width={16} height={16} />
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
