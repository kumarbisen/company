import { useState, useRef, useEffect } from "react"
import { PageIntro } from "../../components/PageIntro/PageIntro"
import { Layout } from "../../Layout/Layout"
import { apiUrl } from "../../data/api"
import * as styles from "./InquiryPage.css"

const goalOptions = [
  "Web Development",
  "App Development",
  "Social Media Management",
  "Marketing",
  "Other Services",
]

const countryCodes = [
  { code: "+1", label: "US/CA (+1)" },
  { code: "+44", label: "UK (+44)" },
  { code: "+91", label: "IN (+91)" },
  { code: "+61", label: "AU (+61)" },
  { code: "+81", label: "JP (+81)" },
  { code: "+49", label: "DE (+49)" },
  { code: "+33", label: "FR (+33)" },
  { code: "+39", label: "IT (+39)" },
  { code: "+55", label: "BR (+55)" },
  { code: "+52", label: "MX (+52)" },
  { code: "+86", label: "CN (+86)" },
  { code: "+971", label: "AE (+971)" },
  { code: "+27", label: "ZA (+27)" },
  { code: "+65", label: "SG (+65)" },
  { code: "+60", label: "MY (+60)" },
  { code: "+63", label: "PH (+63)" },
  { code: "+62", label: "ID (+62)" },
  { code: "+64", label: "NZ (+64)" },
  { code: "+31", label: "NL (+31)" },
  { code: "+46", label: "SE (+46)" },
  { code: "+41", label: "CH (+41)" },
  { code: "+34", label: "ES (+34)" },
  { code: "+82", label: "KR (+82)" },
  { code: "+90", label: "TR (+90)" },
  { code: "+48", label: "PL (+48)" },
  { code: "+32", label: "BE (+32)" },
  { code: "+45", label: "DK (+45)" },
  { code: "+358", label: "FI (+358)" },
  { code: "+47", label: "NO (+47)" },
  { code: "+43", label: "AT (+43)" },
  { code: "+351", label: "PT (+351)" },
  { code: "+30", label: "GR (+30)" },
  { code: "+353", label: "IE (+353)" },
  { code: "+972", label: "IL (+972)" },
  { code: "+966", label: "SA (+966)" },
  { code: "+974", label: "QA (+974)" },
  { code: "+965", label: "KW (+965)" },
  { code: "+973", label: "BH (+973)" },
  { code: "+968", label: "OM (+968)" },
]

export function InquiryPage() {
  // Form states
  const [companyName, setCompanyName] = useState(() => sessionStorage.getItem("brief_companyName") || "")
  const [phone, setPhone] = useState(() => sessionStorage.getItem("brief_phone") || "")
  const [countryCode, setCountryCode] = useState(() => sessionStorage.getItem("brief_countryCode") || "+1")
  const [budget, setBudget] = useState(() => sessionStorage.getItem("brief_budget") || "")
  const [details, setDetails] = useState(() => sessionStorage.getItem("brief_details") || "")
  const [goalValue, setGoalValue] = useState(() => sessionStorage.getItem("brief_goalValue") || "")
  const [showDropdown, setShowDropdown] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const filtered = goalOptions.filter((opt) =>
    opt.toLowerCase().includes(goalValue.toLowerCase())
  )

  // Save to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem("brief_companyName", companyName)
    sessionStorage.setItem("brief_phone", phone)
    sessionStorage.setItem("brief_countryCode", countryCode)
    sessionStorage.setItem("brief_budget", budget)
    sessionStorage.setItem("brief_details", details)
    sessionStorage.setItem("brief_goalValue", goalValue)
  }, [companyName, phone, countryCode, budget, details, goalValue])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Auto-submit after login listener
  useEffect(() => {
    function handleAutoSubmit() {
      // Small timeout to allow token to be stored
      setTimeout(() => {
        submitBrief()
      }, 100)
    }
    window.addEventListener("user-logged-in", handleAutoSubmit)
    return () => window.removeEventListener("user-logged-in", handleAutoSubmit)
  }, [companyName, goalValue, countryCode, phone, budget, details])

  async function submitBrief() {
    const token = localStorage.getItem("user_token")
    if (!token) {
      // Trigger Login Modal
      window.dispatchEvent(new Event("open-google-login"))
      return
    }

    if (!companyName || !goalValue || !phone || !budget || !details) {
      setError("Please fill out all fields before submitting.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const resp = await fetch(apiUrl("/api/workspace/brief"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          companyName,
          primaryGoal: goalValue,
          phone: `${countryCode} ${phone}`,
          budget,
          details,
        }),
      })

      // If token expired or invalid, prompt re-login
      if (resp.status === 401 || resp.status === 403) {
        // Clear stored credentials
        localStorage.removeItem("user_token")
        localStorage.removeItem("user_profile")
        localStorage.removeItem("firebase_id_token")
        // Notify user and open login modal
        setError("Session expired. Please sign in again.")
        window.dispatchEvent(new Event("open-google-login"))
        setLoading(false)
        return
      }

      const data = await resp.json().catch(() => null)
      if (resp.ok) {
        // Clear saved form data
        sessionStorage.removeItem("brief_companyName")
        sessionStorage.removeItem("brief_phone")
        sessionStorage.removeItem("brief_countryCode")
        sessionStorage.removeItem("brief_budget")
        sessionStorage.removeItem("brief_details")
        sessionStorage.removeItem("brief_goalValue")
        // Redirect to user workspace
        window.location.href = "/workspace"
      } else {
        setError(data?.error || "Failed to submit your brief. Please try again.")
      }
    } catch (err) {
      console.error("Error submitting brief", err)
      setError("Connection error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <section className={styles.page}>
        <PageIntro kicker="Get started" title="Build your KunalConnects growth brief." />
        
        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); submitBrief(); }}>
          {error && (
            <div style={{ padding: 14, borderRadius: 8, background: "#fef2f2", border: "1px solid #fee2e2", color: "#dc2626", fontWeight: 600 }}>
              {error}
            </div>
          )}

          <label className={styles.label}>
            Company name
            <input
              className={styles.field}
              placeholder="Company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
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
                required
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
            <div className={styles.phoneRow}>
              <select
                className={styles.selectField}
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                {countryCodes.map((c) => (
                  <option key={c.label} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
              <input
                className={styles.field}
                placeholder="Phone Number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </label>

          <label className={styles.label}>
            Monthly budget range
            <input
              className={styles.field}
              placeholder="Monthly budget range"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />
          </label>

          <label className={styles.label}>
            What should the service pod solve first?
            <textarea
              className={styles.textarea}
              placeholder="Tell us what is stuck, what you want to improve, and what success looks like."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </label>

          <button className={styles.submit} type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Create brief"}
          </button>
        </form>
      </section>
    </Layout>
  )
}
