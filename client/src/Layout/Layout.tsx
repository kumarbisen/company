import type { ReactNode } from "react"
import { Navigation } from "../navigation/Navigation"
import * as styles from "./Layout.css"

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.app}>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <strong className={styles.footerBrand}>KunalConnects</strong>
      <div className={styles.footerLinks}>
        <a className={styles.footerLink} href="/terms">Terms</a>
        <a className={styles.footerLink} href="/privacy">Privacy</a>
        <a className={styles.footerLink} href="/faq">FAQ</a>
      </div>
    </footer>
  )
}
