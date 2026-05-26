import { PageIntro } from "../../components/PageIntro/PageIntro"
import { Layout } from "../../Layout/Layout"
import * as styles from "./ChatPage.css"

export function ChatPage() {
  return (
    <Layout>
      <section className={styles.page}>
        <PageIntro kicker="Chat" title="Talk through the next growth move." />
        <div className={styles.layout}>
          <aside className={styles.threadList}>
            {["Discovery", "Campaign plan", "Website scope"].map((thread) => (
              <button className={styles.threadButton} key={thread}>{thread}</button>
            ))}
          </aside>
          <div className={styles.panel}>
            <p className={styles.messageLeft}>What is the fastest path to more qualified leads?</p>
            <p className={styles.messageRight}>Start with offer clarity, one conversion page, and two acquisition channels we can measure weekly.</p>
            <div className={styles.input}>Ask KunalConnects anything...</div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
