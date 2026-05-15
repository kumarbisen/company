import { PageIntro } from "../../components/PageIntro/PageIntro"
import { Layout } from "../../Layout/Layout"
import * as styles from "./NotFoundPage.css"

export function NotFoundPage() {
  return (
    <Layout>
      <section className={styles.page}>
        <PageIntro kicker="404" title="This page is not in the network yet." />
        <a className={styles.button} href="/">Back home</a>
      </section>
    </Layout>
  )
}
