import { useState, useEffect } from "react"
import { navItems } from "../data/site"
import { apiUrl } from "../data/api"
import * as styles from "./Navigation.css"

type UserProfile = {
  email: string
  name: string
  avatar?: string
}

export function Navigation() {
  const [open, setOpen] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [customName, setCustomName] = useState("")
  const [customEmail, setCustomEmail] = useState("")
  
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem("user_token")
    const profileStr = localStorage.getItem("user_profile")
    if (token && profileStr) {
      try {
        setIsLoggedIn(true)
        setUser(JSON.parse(profileStr))
      } catch {
        localStorage.removeItem("user_token")
        localStorage.removeItem("user_profile")
      }
    }

    // Listen to global sign-in event
    function triggerLogin() {
      setOpenLogin(true)
    }
    window.addEventListener("open-google-login", triggerLogin)
    return () => window.removeEventListener("open-google-login", triggerLogin)
  }, [])

  async function handleGoogleLogin(email: string, name: string) {
    const fallbackUser = {
      email,
      name,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
    }

    try {
      const res = await fetch(apiUrl("/api/auth/gmail-login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      })

      const data = await res.json().catch(() => null)
      const userData = data?.user || fallbackUser
      const token = data?.token || `mock_${btoa(`${email}:${Date.now()}`).replace(/=+$/g, "")}`

      localStorage.setItem("user_token", token)
      localStorage.setItem("user_profile", JSON.stringify(userData))
      setIsLoggedIn(true)
      setUser(userData)
      setOpenLogin(false)

      // Dispatch custom event to notify other components (like AgentPage)
      window.dispatchEvent(new CustomEvent("user-logged-in", { detail: userData }))

      // Redirect to workspace
      if (window.location.pathname !== "/agent") {
        window.location.href = "/workspace"
      }
    } catch (err) {
      console.error("Simulated Gmail login failed, using local fallback", err)

      const token = `mock_${btoa(`${email}:${Date.now()}`).replace(/=+$/g, "")}`
      localStorage.setItem("user_token", token)
      localStorage.setItem("user_profile", JSON.stringify(fallbackUser))
      setIsLoggedIn(true)
      setUser(fallbackUser)
      setOpenLogin(false)
      window.dispatchEvent(new CustomEvent("user-logged-in", { detail: fallbackUser }))

      if (window.location.pathname !== "/agent") {
        window.location.href = "/workspace"
      }
    }
  }

  function handleLogout() {
    localStorage.removeItem("user_token")
    localStorage.removeItem("user_profile")
    setIsLoggedIn(false)
    setUser(null)
    window.location.href = "/"
  }

  return (
    <>
      <header className={styles.header} data-open={open ? "true" : undefined}>
        <a className={styles.brand} href="/">
          KunalConnects
        </a>

        {/* Desktop nav */}
        <nav className={styles.nav} aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              className={styles.navLink}
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          {isLoggedIn && (
            <a className={styles.navLink} href="/workspace">
              Workspace
            </a>
          )}
        </nav>

        {/* Desktop actions */}
        <div className={styles.actions}>
          {isLoggedIn ? (
            <>
              <a className={styles.networkButton} href="/workspace">
                Go to Workspace
              </a>
              <div className={styles.profilePill}>
                <div className={styles.avatar}>
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    user?.name?.charAt(0).toUpperCase()
                  )}
                </div>
                <span>{user?.name?.split(" ")[0]}</span>
              </div>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.logoutBtn}
                style={{ color: "inherit", fontWeight: 600, marginRight: 8 }}
                onClick={() => setOpenLogin(true)}
              >
                Sign in
              </button>
              <a className={styles.networkButton} href="/services">
                Services
              </a>
              <a className={styles.darkButton} href="/agent">
                Get started
              </a>
            </>
          )}
        </div>

        {/* Hamburger toggle — visible only on mobile */}
        <button
          className={styles.menuToggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={open ? styles.iconClose : styles.iconHamburger}>
            {open ? (
              /* X icon */
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            ) : (
              /* Hamburger icon */
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            )}
          </span>
        </button>

        {/* Mobile drawer — only shown when open */}
        {open && (
          <div className={styles.mobileMenu}>
            <nav className={styles.mobileNav} aria-label="Mobile navigation">
              {navItems.map((item) => (
                <a
                  className={styles.mobileNavLink}
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              {isLoggedIn && (
                <a className={styles.mobileNavLink} href="/workspace" onClick={() => setOpen(false)}>
                  Workspace
                </a>
              )}
            </nav>
            <div className={styles.mobileActions}>
              {isLoggedIn ? (
                <>
                  <a className={styles.networkButton} href="/workspace" onClick={() => setOpen(false)}>
                    Go to Workspace
                  </a>
                  <button className={styles.darkButton} style={{ width: "100%" }} onClick={handleLogout}>
                    Sign out ({user?.name})
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={styles.darkButton}
                    style={{ width: "100%", background: "none", border: "1px solid", color: "inherit", marginBottom: 6 }}
                    onClick={() => {
                      setOpen(false)
                      setOpenLogin(true)
                    }}
                  >
                    Sign in
                  </button>
                  <a className={styles.networkButton} href="/services" onClick={() => setOpen(false)}>
                    Services
                  </a>
                  <a className={styles.darkButton} href="/agent" onClick={() => setOpen(false)}>
                    Get started
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ─── SIMULATED GOOGLE SIGN-IN MODAL ─── */}
      {openLogin && (
        <div className={styles.loginOverlay} onClick={() => setOpenLogin(false)}>
          <div className={styles.loginModal} onClick={(e) => e.stopPropagation()}>
            {/* Google G logo */}
            <svg className={styles.googleLogo} viewBox="0 0 24 24" width="42" height="42" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>

            <h2 className={styles.loginTitle}>Sign in with Google</h2>
            <p className={styles.loginSubtitle}>Choose a simulated Gmail account to jump into your workspace workspace instantly.</p>

            {/* Simulated accounts */}
            <button type="button" className={styles.mockAccountItem} onClick={() => handleGoogleLogin("kumar.bisen@gmail.com", "Kumar Bisen")}>
              <div className={styles.avatar}>KB</div>
              <div className={styles.mockAccountInfo}>
                <span className={styles.mockAccountName}>Kumar Bisen</span>
                <span className={styles.mockAccountEmail}>kumar.bisen@gmail.com</span>
              </div>
            </button>

            <button type="button" className={styles.mockAccountItem} onClick={() => handleGoogleLogin("aarav.singh@gmail.com", "Aarav Singh")}>
              <div className={styles.avatar}>AS</div>
              <div className={styles.mockAccountInfo}>
                <span className={styles.mockAccountName}>Aarav Singh</span>
                <span className={styles.mockAccountEmail}>aarav.singh@gmail.com</span>
              </div>
            </button>

            <div className={styles.orDivider}>
              <span className={styles.orDividerSpan}>Or use any custom email</span>
            </div>

            {/* Custom account input */}
            <form
              className={styles.customLoginForm}
              onSubmit={(e) => {
                e.preventDefault()
                if (customEmail && customName) {
                  handleGoogleLogin(customEmail.trim(), customName.trim())
                }
              }}
            >
              <input
                className={styles.loginInput}
                type="text"
                placeholder="Full Name"
                required
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
              />
              <input
                className={styles.loginInput}
                type="email"
                placeholder="Gmail Address (e.g. name@gmail.com)"
                required
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
              />
              <button className={styles.loginSubmitBtn} type="submit" disabled={!customName || !customEmail}>
                Continue with Custom Account
              </button>
            </form>

            <button type="button" className={styles.loginCancelBtn} onClick={() => setOpenLogin(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}
