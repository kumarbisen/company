import { useState } from "react"
import { navItems } from "../data/site"
import * as styles from "./Navigation.css"

export function Navigation() {
  const [open, setOpen] = useState(false)

  return (
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
      </nav>

      {/* Desktop actions */}
      <div className={styles.actions}>
        <a className={styles.networkButton} href="/services">

          Services
        </a>
        <a className={styles.darkButton} href="/agent">
          Get started
        </a>
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
          </nav>
          <div className={styles.mobileActions}>
            <a className={styles.networkButton} href="/services">
              Services
            </a>
            <a className={styles.darkButton} href="/agent">
              Get started
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
