import { PageIntro } from "../../components/PageIntro/PageIntro"
import { feedItems } from "../../data/site"
import { Layout } from "../../Layout/Layout"
import * as styles from "./LiveFeedPage.css"

export function LiveFeedPage({ compact = false }: { compact?: boolean }) {
  const content = (
    <section className={compact ? styles.compact : styles.page}>
      {!compact && <PageIntro kicker="Live Feed" title="Signals moving through the KunalConnects network." />}
      <div className={styles.shell}>
        <div className={styles.header}>
          <span className={styles.liveDot} />
          <strong>Live</strong>
          <small className={styles.updated}>updated now</small>
        </div>
        <div className={styles.grid}>
          {feedItems.map((item) => (
            <article className={styles.card} key={item.title}>
              <small className={styles.meta}>{item.meta}</small>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.text}>{item.text}</p>
              <b className={styles.match}>{item.match}</b>
            </article>
          ))}
        </div>
      </div>
    </section>
  )

  return compact ? content : <Layout>{content}</Layout>
}
