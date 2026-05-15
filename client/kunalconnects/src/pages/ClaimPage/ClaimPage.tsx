import { PageIntro } from "../../components/PageIntro/PageIntro"
import { Layout } from "../../Layout/Layout"
import * as styles from "./ClaimPage.css"

export function ClaimPage() {
  return (
    <Layout>
      <section className={styles.page}>
        <PageIntro kicker="Claim" title="Claim your workspace." />
        <div className={styles.box}>
          <p className={styles.text}>Your KunalConnects workspace will hold briefs, service recommendations, campaign notes, and weekly signals.</p>
          <a className={styles.button} href="/agent">Start setup <span className={styles.icon}>↗</span></a>
        </div>
      </section>
    </Layout>
  )
}
