import { useState, useRef, useEffect } from "react"
import { PageIntro } from "../../components/PageIntro/PageIntro"
import { Layout } from "../../Layout/Layout"
import * as styles from "./AgentPage.css"

const goalOptions = [
  "Web Development",
  "App Development",
  "Social Media Management",
  "Social Media Marketing",
  "Other Services",
]

export function AgentPage() {
  const [goalValue, setGoalValue] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const filtered = goalOptions.filter((opt) =>
    opt.toLowerCase().includes(goalValue.toLowerCase())
  )

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <Layout>
      <section className={styles.page}>
        <PageIntro kicker="Get started" title="Build your KunalConnects growth brief." />
        <form className={styles.form}>
          <label className={styles.label}>
            Company name
            <input className={styles.field} placeholder="Company name" />
          </label>

          <div className={styles.label} ref={wrapperRef}>
            <span className={styles.labelText}>Primary goal</span>
            <div className={styles.dropdownWrap}>
              <input
                className={styles.field}
                placeholder="Type or select a service…"
                value={goalValue}
                onChange={(e) => {
                  setGoalValue(e.target.value)
                  setShowDropdown(true)
                }}
                onFocus={() => setShowDropdown(true)}
                autoComplete="off"
              />
              {showDropdown && filtered.length > 0 && (
                <ul className={styles.dropdown}>
                  {filtered.map((opt) => (
                    <li
                      key={opt}
                      className={styles.dropdownItem}
                      onMouseDown={() => {
                        setGoalValue(opt)
                        setShowDropdown(false)
                      }}
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <label className={styles.label}>
            Phone Number
            <input className={styles.field} placeholder="Phone Number" />
          </label>

          <label className={styles.label}>
            Monthly budget range
            <input className={styles.field} placeholder="Monthly budget range" />
          </label>

          <label className={styles.label}>
            What should the service pod solve first?
            <textarea className={styles.textarea} placeholder="Tell us what is stuck, what you want to improve, and what success looks like." />
          </label>
          <button className={styles.submit} type="button">Create brief</button>
        </form>
      </section>
    </Layout>
  )
}
