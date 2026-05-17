import { PageIntro } from "../../components/PageIntro/PageIntro"
import { feedItems } from "../../data/site"
import { Layout } from "../../Layout/Layout"
import * as styles from "./LiveFeedPage.css"

export function LiveFeedPage({ compact = false }: { compact?: boolean }) {
  const content = (
    <section className={compact ? styles.compact : styles.page}>
      {!compact && <PageIntro kicker="Live" title="Services we deliver through KunalConnects network." />}
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
              <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.linkIcon} aria-label={`Go to ${item.title}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )

  return compact ? content : <Layout>{content}</Layout>
}

