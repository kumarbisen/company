import { useState, useEffect } from "react"
import { PageIntro } from "../../components/PageIntro/PageIntro"
import { feedItems as fallbackItems } from "../../data/site"
import { apiUrl } from "../../data/api"
import { Layout } from "../../Layout/Layout"
import * as styles from "./LiveFeedPage.css"

export function LiveFeedPage({ compact = false }: { compact?: boolean }) {
  const [items, setItems] = useState<any[]>(fallbackItems)

  useEffect(() => {
    fetch(apiUrl("/api/feed"))
      .then((res) => {
        if (!res.ok) throw new Error("Server error")
        return res.json()
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data)
        }
      })
      .catch((err) => console.log("Failed to fetch live feed from server, using site data fallback", err))
  }, [])

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
          {items.map((item, idx) => (
            <article className={styles.card} key={item._id || idx}>
              <small className={styles.meta}>{item.meta}</small>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.text}>{item.text}</p>
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.linkIcon} aria-label={`Go to ${item.title}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )

  return compact ? content : <Layout>{content}</Layout>
}
