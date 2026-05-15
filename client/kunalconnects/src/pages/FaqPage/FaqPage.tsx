import { faqs } from "../../data/site"
import { Layout } from "../../Layout/Layout"
import * as styles from "./FaqPage.css"

export function FaqPage() {
  return (
    <Layout>
      <section className={styles.page}>
        <h1 className={styles.title}>KunalConnects — FAQ</h1>
        <div className={styles.list}>
          {faqs.map((faq) => (
            <article className={styles.item} key={faq.question}>
              <h2 className={styles.question}>{faq.question}</h2>
              {faq.answer.map((line) => (
                <p className={styles.answer} key={line}>{line}</p>
              ))}
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}
