import { PageIntro } from "../../components/PageIntro/PageIntro"
import { Layout } from "../../Layout/Layout"
import * as styles from "./AgentPage.css"

export function AgentPage() {
  return (
    <Layout>
      <section className={styles.page}>
        <PageIntro kicker="Get started" title="Build your KunalConnects growth brief." />
        <form className={styles.form}>
          {["Company name", "Primary goal", "Current channels", "Monthly budget range"].map((label) => (
            <label className={styles.label} key={label}>
              {label}
              <input className={styles.field} placeholder={label} />
            </label>
          ))}
          <label className={styles.label}>
            What should the service pod solve first?
            <textarea className={styles.textarea} placeholder="Tell us what is stuck, what you want to improve, and what success looks like." />
          </label>
          <button className={styles.submit} type="button">Create brief</button>
        </form>
      </section>
    </Layout>
  )
}
