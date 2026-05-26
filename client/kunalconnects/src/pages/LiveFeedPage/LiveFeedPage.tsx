import { useState, useEffect } from "react"
import { PageIntro } from "../../components/PageIntro/PageIntro"
import { apiUrl } from "../../data/api"
import { Layout } from "../../Layout/Layout"
import * as styles from "./LiveFeedPage.css"
import { ExternalLinkIcon } from "../../styles/Icons"

export function LiveFeedPage({ compact = false }: { compact?: boolean }) {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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
        setLoading(false)
      })
      .catch((err) => {
        console.log("Failed to fetch live feed from server", err)
        setLoading(false)
      })
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
        {loading ? (
          <div className={styles.grid}>Loading feed…</div>
        ) : items.length === 0 ? (
          <div className={styles.grid}>No feed items available</div>
        ) : (
          <div className={styles.grid}>
            {items.map((item, idx) => (
              <article className={styles.card} key={item._id || idx}>
                <small className={styles.meta}>{item.meta}</small>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.text}>{item.text}</p>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles.linkIcon} aria-label={`Go to ${item.title}`}>
                    <ExternalLinkIcon width={18} height={18} />
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )

  return compact ? content : <Layout>{content}</Layout>
}
