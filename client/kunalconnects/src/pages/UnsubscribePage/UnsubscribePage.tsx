import { Layout } from "../../Layout/Layout"
import * as styles from "./UnsubscribePage.css"

export function UnsubscribePage() {
  return (
    <Layout>
      <section className={styles.page}>
        <div className={styles.box}>
          <h1 className={styles.title}>Unsubscribe</h1>
          <p className={styles.text}>You can stop receiving KunalConnects updates from this page.</p>
          <button className={styles.button} type="button">Confirm unsubscribe</button>
        </div>
      </section>
    </Layout>
  )
}
