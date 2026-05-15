import { PageIntro } from "../../components/PageIntro/PageIntro"
import { services } from "../../data/site"
import { Layout } from "../../Layout/Layout"
import * as styles from "./ExplorePage.css"

export function ExplorePage() {
  return (
    <Layout>
      <section className={styles.page}>
        <PageIntro kicker="Explore" title="Browse service pods by business need." />
        <div className={styles.grid}>
          {services.map((service, index) => (
            <article className={styles.card} key={service}>
              <small className={styles.number}>{String(index + 1).padStart(2, "0")}</small>
              <h3 className={styles.title}>{service}</h3>
              <p className={styles.text}>Strategy, execution, reporting, and improvements packaged around this capability.</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}
