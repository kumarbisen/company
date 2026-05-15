import { Layout } from "../../Layout/Layout"
import * as styles from "./LegalPage.css"

export function LegalPage({ type }: { type: "terms" | "privacy" }) {
  const isTerms = type === "terms"

  return (
    <Layout>
      <section className={styles.page}>
        <h1 className={styles.title}>{isTerms ? "Terms of Service" : "Privacy Policy"}</h1>
        <h2 className={styles.heading}>1. Introduction</h2>
        <p className={styles.text}>
          {isTerms
            ? "These terms describe how clients may use KunalConnects services, websites, systems, and related project work."
            : "This policy explains how KunalConnects collects, uses, and protects information submitted through its service workflows."}
        </p>
        <h2 className={styles.heading}>2. Service Data</h2>
        <p className={styles.text}>We may process business details, contact information, campaign materials, briefs, analytics, and communication history.</p>
        <h2 className={styles.heading}>3. Responsibilities</h2>
        <p className={styles.text}>Clients are responsible for providing accurate inputs, approvals, account access, and any legally required permissions.</p>
        <h2 className={styles.heading}>4. Contact</h2>
        <p className={styles.text}>For questions, contact KunalConnects.</p>
      </section>
    </Layout>
  )
}
