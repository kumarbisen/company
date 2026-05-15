import * as styles from "./PageIntro.css"

export function PageIntro({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className={styles.intro}>
      <span className={styles.kicker}>{kicker}</span>
      <h1 className={styles.title}>{title}</h1>
    </div>
  )
}
