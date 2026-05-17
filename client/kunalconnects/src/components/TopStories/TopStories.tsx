import { useState, useEffect } from "react"
import { topStories } from "../../data/site"
import * as styles from "./TopStories.css"

export function TopStories() {
  const [index, setIndex] = useState(0)
  const total = topStories.length
  const story = topStories[index]
  const [title, setTitle] = useState(story.title)
  const [excerpt, setExcerpt] = useState(story.excerpt)

  function prev() {
    setIndex((i) => Math.max(0, i - 1))
  }

  function next() {
    setIndex((i) => Math.min(total - 1, i + 1))
  }

  // fetch metadata for external links and update local title/excerpt
  useEffect(() => {
    if (!story?.link || !story.link.startsWith("http")) return
    const controller = new AbortController()
    fetch(`http://localhost:4000/meta?url=${encodeURIComponent(story.link)}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (data.title) setTitle(data.title)
        if (data.description) setExcerpt(data.description)
      })
      .catch(() => {})
    return () => controller.abort()
  }, [story?.link])

  return (
    <section className={styles.section}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <div className={styles.heading}>
          <span className={styles.headingLabel}>Top Stories</span>
        </div>

        <div className={styles.pagination}>
          <button
            className={styles.navBtn}
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous story"
          >
            ←
          </button>
          <span className={styles.pageCounter}>
            {index + 1} / {total}
          </span>
          <button
            className={styles.navBtn}
            onClick={next}
            disabled={index === total - 1}
            aria-label="Next story"
          >
            →
          </button>
        </div>
      </div>

      {/* Story card — key forces re-animation on slide change */}
      <div className={styles.card} key={index}>
        <div className={styles.imageWrap}>
          {story.image ? (
            <img
              className={styles.image}
              src={story.image}
              alt={story.title}
              loading="lazy"
            />
          ) : (
            <div className={styles.imagePlaceholder}>No image</div>
          )}
        </div>

        <div className={styles.body}>
          <span className={styles.category}>{story.category}</span>
          <h3 className={styles.storyTitle}>{title}</h3>
          <p style={{ marginBottom: 16 }}>{excerpt}</p>
          <a
            className={styles.readMore}
            href={story.link}
            target={story.link && story.link.startsWith("http") ? "_blank" : undefined}
            rel={story.link && story.link.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            Read More <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
