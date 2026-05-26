import { PageIntro } from "../../components/PageIntro/PageIntro"
import { servicePages } from "../../data/site"
import { Layout } from "../../Layout/Layout"
import * as styles from "./ServicesPage.css"

export function ServicesPage() {
  return (
    <Layout>
      <section className={styles.page}>
        <PageIntro kicker="Services" title="All services offered by KunalConnects." />
        <div className={styles.grid}>
          {servicePages.map((service, index) => (
            <a className={styles.card} key={service.slug} href={`/services/${service.slug}`}>
              <small className={styles.number}>{String(index + 1).padStart(2, "0")}</small>
              <h3 className={styles.title}>{service.name}</h3>
              <p className={styles.text}>{service.description}</p>
            </a>
          ))}
        </div>
      </section>
    </Layout>
  )
}
