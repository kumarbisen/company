import { Layout } from "../../Layout/Layout"
import { PageIntro } from "../../components/PageIntro/PageIntro"
import * as styles from "./ServiceDetailPage.css"

type ServiceDetail = {
  name: string
  description: string
  included: string[]
  idealFor: string[]
  outcomes: string[]
}

export function ServiceDetailPage({ service }: { service: ServiceDetail }) {
  return (
    <Layout>
      <section className={styles.page}>
        <PageIntro kicker="Service" title={service.name} />
        <p className={styles.lead}>{service.description}</p>

        <div className={styles.grid}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What’s included</h2>
            <ul className={styles.list}>
              {service.included.map((item) => (
                <li className={styles.item} key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Who this is for</h2>
            <ul className={styles.list}>
              {service.idealFor.map((item) => (
                <li className={styles.item} key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className={styles.outcomes}>
          <h2 className={styles.sectionTitle}>Expected outcomes</h2>
          <ul className={styles.list}>
            {service.outcomes.map((item) => (
              <li className={styles.item} key={item}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.ctaSection}>
          <a className={styles.flowButton} href="https://kunalconnects.com/agent">
            Get Free Consultation <span className={styles.flowIcon}>↗</span>
          </a>
        </section>
      </section>
    </Layout>
  )
}
