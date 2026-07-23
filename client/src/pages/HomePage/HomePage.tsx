import { benefits, services } from "../../data/site"
import { Layout } from "../../Layout/Layout"
import { TopStories } from "../../components/TopStories/TopStories"
import { LiveFeedPage } from "../LiveFeedPage/LiveFeedPage"
import * as styles from "./HomePage.css"

const steps = [
  ["Map", "Clarify your offer, audience, current channels, and bottlenecks."],
  ["Match", "Select the service pod that fits your immediate growth priority."],
  ["Launch", "Ship the campaign, page, workflow, or content system with tight cadence."],
  ["Optimize", "Review signals weekly and improve the system with live data."],
]

export function HomePage() {
  return (
    <Layout>
      <main>
      <section className={styles.hero}>
        <div className={styles.glow} />

        <div className={styles.heroGrid}>
          <h1 className={styles.heroTitle}>
            A Growth
            <br />
            Network of
            <br />
            <span className={styles.highlighted}>Service Experts</span>
            <br />
            for Startups
          </h1>
          <aside className={styles.heroCopy}>
            <p className={styles.heroText}>
              Build your MVP and Presence. we KunalConnects plan, build, launch, and optimize the right services across content, web, ads, and automation.
            </p>
            <a className={styles.flowButton} href="/live-feed">
              Follow the Flow <span className={styles.flowIcon}>↗</span>
            </a>
          </aside>
        </div>
      </section>

      <section className={styles.marquee} aria-label="Service categories">
        <div className={styles.marqueeTrack}>
          {services.concat(services).map((service, index) => (
            <span className={styles.marqueeItem} key={`${service}-${index}`}>
              {service}
            </span>
          ))}
        </div>
      </section>

      <section id="how-it-works" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>How it works</span>
          <h2 className={styles.sectionTitle}>From messy demand to a managed growth system.</h2>
        </div>
        <div className={styles.steps}>
          {steps.map(([title, text], index) => (
            <article className={styles.stepCard} key={title}>
              <small className={styles.stepNumber}>0{index + 1}</small>
              <h3 className={styles.stepTitle}>{title}</h3>
              <p className={styles.stepText}>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="benefits" className={styles.splitSection}>
        <div>
          <span className={styles.limeEyebrow}>Benefits</span>
          <h2 className={styles.splitTitle}>One partner for the work between strategy and revenue.</h2>
        </div>
        <div className={styles.benefitList}>
          {benefits.map((benefit) => (
            <p className={styles.benefitItem} key={benefit}>{benefit}</p>
          ))}
        </div>
      </section>

      <LiveFeedPage compact />
      <TopStories />
      
      <section className={styles.ctaSection}>
        <a className={styles.flowButton} href="https://kunalconnects.com/agent">
          Get Free Consultation <span className={styles.flowIcon}>↗</span>
        </a>
      </section>
      </main>
    </Layout>
  )
}
