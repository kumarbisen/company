import { useState, useEffect } from "react"
import { navItems } from "../data/site"
import { apiUrl } from "../data/api"
import { MenuCloseIcon, MenuHamburgerIcon } from "../styles/Icons"
import * as styles from "./Navigation.css"
import { auth, googleProvider, isFirebaseConfigured, missingFirebaseConfigKeys } from "../config/firebase"
import { getAdditionalUserInfo, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth"

type UserProfile = {
  email: string
  name: string
  avatar?: string
  uid?: string
  providerId?: string
  emailVerified?: boolean
  lastSignInAt?: string
  isNewUser?: boolean
}

export function Navigation() {
  const [open, setOpen] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [hasLoggedInBefore, setHasLoggedInBefore] = useState(false)

  // Firebase Auth integration states
  const [showDevFallback, setShowDevFallback] = useState(false)
  const [authErrorMsg, setAuthErrorMsg] = useState("")
  const [isAuthLoading, setIsAuthLoading] = useState(false)

  useEffect(() => {
    // Check if user has logged in before
    setHasLoggedInBefore(localStorage.getItem("has_logged_in_before") === "true")

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

    // Handle Firebase redirect login result if any
    if (auth) {
      getRedirectResult(auth)
        .then(async (result) => {
          if (result) {
            setIsAuthLoading(true)
            const firebaseUser = result.user
            const additionalInfo = getAdditionalUserInfo(result)
            if (firebaseUser && firebaseUser.email) {
              await handleGoogleLogin(
                {
                  email: firebaseUser.email,
                  name: firebaseUser.displayName || "Google User",
                  avatar: firebaseUser.photoURL || "",
                  uid: firebaseUser.uid,
                  providerId: firebaseUser.providerData[0]?.providerId || firebaseUser.providerId || "google.com",
                  emailVerified: firebaseUser.emailVerified,
                  lastSignInAt: firebaseUser.metadata.lastSignInTime || undefined,
                  isNewUser: additionalInfo?.isNewUser || false,
                },
                await firebaseUser.getIdToken()
              )
            }
            setIsAuthLoading(false)
          }
        })
        .catch((err) => {
          console.error("Redirect login error:", err)
          setIsAuthLoading(false)
        })
    }

    // Listen to global sign-in event
    function triggerLogin() {
      triggerFirebaseLogin()
    }
    window.addEventListener("open-google-login", triggerLogin)
    return () => window.removeEventListener("open-google-login", triggerLogin)
  }, [])

  async function triggerFirebaseLogin() {
    setIsAuthLoading(true)
    setAuthErrorMsg("")
    setShowDevFallback(false)

    if (!isFirebaseConfigured || !auth || !googleProvider) {
      const missingKeys = missingFirebaseConfigKeys.join(", ")
      setAuthErrorMsg(
        missingKeys
          ? `Missing Firebase environment variables: ${missingKeys}`
          : "Firebase environment variables are missing."
      )
      setShowDevFallback(true)
      setOpenLogin(true)
      setIsAuthLoading(false)
      return
    }

    try {
      // 1. Open Google Sign-In Popup using Firebase Auth
      const result = await signInWithPopup(auth, googleProvider)
      const firebaseUser = result.user
      const additionalInfo = getAdditionalUserInfo(result)

      if (firebaseUser && firebaseUser.email) {
        // 2. Synchronize details with our existing backend database session
        await handleGoogleLogin(
          {
            email: firebaseUser.email,
            name: firebaseUser.displayName || "Google User",
            avatar: firebaseUser.photoURL || "",
            uid: firebaseUser.uid,
            providerId: firebaseUser.providerData[0]?.providerId || firebaseUser.providerId || "google.com",
            emailVerified: firebaseUser.emailVerified,
            lastSignInAt: firebaseUser.metadata.lastSignInTime || undefined,
            isNewUser: additionalInfo?.isNewUser || false,
          },
          await firebaseUser.getIdToken()
        )
      } else {
        throw new Error("Could not retrieve user email from Google account.")
      }
    } catch (err: any) {
      if (err.code === "auth/popup-blocked" || err.message?.includes("popup-blocked")) {
        console.warn("Popup blocked by browser. Falling back to redirect...")
        await signInWithRedirect(auth, googleProvider)
        return
      }

      console.warn("Firebase Google Sign-In popup could not complete. Providing sandbox developer fallback...", err)
      setAuthErrorMsg(err.message || "Authentication error occurred.")
      setShowDevFallback(true)
      setOpenLogin(true) // Open fallback modal dialog to guide the developer/user
    } finally {
      setIsAuthLoading(false)
    }
  }

  async function handleGoogleLogin(firebaseProfile: UserProfile, firebaseIdToken: string) {
    localStorage.setItem("has_logged_in_before", "true")
    setHasLoggedInBefore(true)

    const fallbackUser = {
      ...firebaseProfile,
      avatar: firebaseProfile.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(firebaseProfile.name)}`,
    }

    try {
      const res = await fetch(apiUrl("/api/auth/gmail-login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: firebaseProfile.email,
          name: firebaseProfile.name,
          avatar: firebaseProfile.avatar,
          firebaseIdToken,
          firebaseUid: firebaseProfile.uid,
          providerId: firebaseProfile.providerId,
          emailVerified: firebaseProfile.emailVerified,
        }),
      })

      const data = await res.json().catch(() => null)
      const userData = data?.user || fallbackUser
      const token = data?.token || `mock_${btoa(`${firebaseProfile.email}:${Date.now()}`).replace(/=+$/g, "")}`

      localStorage.setItem("user_token", token)
      localStorage.setItem("user_profile", JSON.stringify(userData))
      localStorage.setItem("firebase_id_token", firebaseIdToken)
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
      console.error("Gmail database synchronization failed, using local fallback session", err)

      const token = `mock_${btoa(`${firebaseProfile.email}:${Date.now()}`).replace(/=+$/g, "")}`
      localStorage.setItem("user_token", token)
      localStorage.setItem("user_profile", JSON.stringify(fallbackUser))
      localStorage.setItem("firebase_id_token", firebaseIdToken)
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
    localStorage.removeItem("firebase_id_token")
    setIsLoggedIn(false)
    setUser(null)
    window.location.href = "/"
  }

  return (
    <>
      <header className={styles.header} data-open={open ? "true" : undefined}>
        <a className={styles.brand} href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <img src="/favicon.svg?v=2" alt="KunalConnects Logo" style={{ width: '36px', height: '36px' }} />
          <span style={{ fontFamily: '"Dancing Script", cursive', fontSize: '32px', fontWeight: 700, lineHeight: 1, paddingBottom: '4px' }}>KunalConnects</span>
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
              <a className={styles.networkButton} href="/services">
                Services
              </a>
              {hasLoggedInBefore ? (
                <button
                  className={styles.darkButton}
                  style={{ cursor: "pointer", border: "none", fontFamily: "inherit", fontSize: "inherit" }}
                  onClick={triggerFirebaseLogin}
                >
                  Sign in
                </button>
              ) : (
                <a className={styles.darkButton} href="/agent">
                  Get started
                </a>
              )}
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
            {open ? <MenuCloseIcon width={22} height={22} /> : <MenuHamburgerIcon width={22} height={22} />}
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
                  <button className={styles.darkButton} style={{ width: "100%" }} onClick={handleLogout}>
                    Sign out ({user?.name})
                  </button>
                </>
              ) : (
                <>
                  <a className={styles.networkButton} href="/services" onClick={() => setOpen(false)}>
                    Services
                  </a>
                  {hasLoggedInBefore ? (
                    <button
                      className={styles.darkButton}
                      style={{ width: "100%", cursor: "pointer", border: "none", fontFamily: "inherit", fontSize: "inherit" }}
                      onClick={() => {
                        setOpen(false)
                        triggerFirebaseLogin()
                      }}
                    >
                      Sign in
                    </button>
                  ) : (
                    <a className={styles.darkButton} href="/agent" onClick={() => setOpen(false)}>
                      Get started
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ─── AUTH GATE LOADING OVERLAY ─── */}
      {isAuthLoading && (
        <div className={styles.loginOverlay} style={{ zIndex: 9999 }}>
          <div style={{ textAlign: "center", color: "#151515", fontFamily: '"Space Grotesk", sans-serif' }}>
            <div style={{ width: 48, height: 48, border: "4px solid #151515", borderTopColor: "#b8ff38", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>Connecting to Google Auth…</h3>
            <span style={{ fontSize: 13, color: "#6f6a62" }}>Please complete sign in on the popup window</span>
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      )}

      {/* ─── FIREBASE CONFIGURATION FALLBACK DIALOG ─── */}
      {openLogin && showDevFallback && (
        <div className={styles.loginOverlay} onClick={() => setOpenLogin(false)}>
          <div className={styles.loginModal} onClick={(e) => e.stopPropagation()}>
            {/* Warning Icon / Error header */}
            <div style={{ fontSize: 42, marginBottom: 12 }}>⚠️</div>
            <h2 className={styles.loginTitle} style={{ fontSize: 20 }}>Firebase Configuration Required</h2>
            <p className={styles.loginSubtitle} style={{ color: "#b91c1c", fontWeight: 700, margin: "0 0 16px", fontSize: 13.5 }}>
              Configure the Firebase environment variables in your client `.env` file to enable real Google Sign-In.
            </p>

            <div style={{ background: "#f6f3ee", padding: "14px 16px", borderRadius: 10, fontSize: 12, color: "#4b5563", marginBottom: 20, textAlign: "left", lineHeight: 1.5, border: "1px solid #ded9d1" }}>
              <strong style={{ color: "#151515", display: "block", marginBottom: 6 }}>Add these VITE keys to client `.env`:</strong>
              <pre style={{ margin: 0, fontFamily: "monospace", fontSize: 11, background: "#fff", padding: 10, borderRadius: 6, border: "1px solid #ded9d1", overflowX: "auto", color: "#1f2937" }}>
                {`VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890`}
              </pre>
              <small style={{ display: "block", marginTop: 8, color: "#6f6a62", fontStyle: "italic" }}>
                Error detail: {authErrorMsg}
              </small>
            </div>

            <button type="button" className={styles.loginCancelBtn} style={{ width: "100%" }} onClick={() => setOpenLogin(false)}>
              Close and configure
            </button>
          </div>
        </div>
      )}
    </>
  )
}
