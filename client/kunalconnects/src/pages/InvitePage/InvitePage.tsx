import { PageIntro } from "../../components/PageIntro/PageIntro"
import { Layout } from "../../Layout/Layout"
import * as styles from "./InvitePage.css"

export function InvitePage() {
  return (
    <Layout>
      <section className={styles.page}>
        <PageIntro kicker="Invite" title="Bring your team into the operating room." />
        <div className={styles.box}>
          <p className={styles.text}>Share a clean project intake with founders, marketers, sales teams, or operators.</p>
          <a className={styles.button} href="/agent/claim">Claim workspace</a>
        </div>
      </section>
    </Layout>
  )
}
