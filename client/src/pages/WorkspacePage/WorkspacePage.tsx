import { useState, useEffect, useRef } from "react"
import type { ReactNode } from "react"
import { apiUrl } from "../../data/api"
import { WorkspaceBriefIcon, WorkspaceServicesIcon, WorkspaceMessagesIcon, WorkspacePaymentsIcon } from "../../styles/Icons"
import { servicePages } from "../../data/site"
import * as styles from "./WorkspacePage.css"

type Tab = "brief" | "services" | "messages" | "payments"

type ServiceItem = {
  name: string
  status: "In Discussion" | "In Progress" | "Completed" | "Pending Payment"
  price: number
  paid: boolean
}

type PaymentRecord = {
  serviceName: string
  amount: number
  paymentId: string
  orderId: string
  date: string
}

type Brief = {
  companyName: string
  primaryGoal: string
  phone: string
  budget: string
  details: string
  submittedAt: string
}

type UserWorkspace = {
  _id: string
  email: string
  name: string
  brief?: Brief
  services: ServiceItem[]
  payments: PaymentRecord[]
}

type ChatMessage = {
  _id: string
  message: string
  sender: "user" | "admin"
  createdAt: string
}

// Dynamically load the Razorpay checkout script
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true)
      return
    }
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export function WorkspacePage() {
  const [tab, setTab] = useState<Tab>("brief")
  const [workspace, setWorkspace] = useState<UserWorkspace | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Chat states
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [sendingMsg, setSendingMsg] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Razorpay Checkout states
  const [checkoutService, setCheckoutService] = useState<{ name: string; price: number } | null>(null)
  const [paymentLoading, setPaymentLoading] = useState(false)

  const workspaceNavItems = [
    {
      key: "brief",
      label: "Brief & Progress",
      icon: <WorkspaceBriefIcon width={16} height={16} />,
    },
    {
      key: "services",
      label: "Select Services",
      icon: <WorkspaceServicesIcon width={16} height={16} />,
    },
    {
      key: "messages",
      label: "Messages Chat",
      icon: <WorkspaceMessagesIcon width={16} height={16} />,
    },
    {
      key: "payments",
      label: "Payments Ledger",
      icon: <WorkspacePaymentsIcon width={16} height={16} />,
    },
  ] as { key: Tab; label: string; icon: ReactNode }[]

  useEffect(() => {
    fetchWorkspace()
  }, [])

  useEffect(() => {
    if (tab === "messages") {
      fetchMessages()
      // Setup a periodic poll for messages every 5 seconds for realism
      const timer = setInterval(() => {
        fetchMessages(true)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [tab])

  useEffect(() => {
    // Scroll to bottom when a new message is added (length changes)
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages.length])

  const token = localStorage.getItem("user_token")

  async function fetchWorkspace() {
    if (!token) {
      setLoading(false)
      return
    }
    try {
      const resp = await fetch(apiUrl("/api/workspace"), {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (resp.ok) {
        const data = await resp.json()
        setWorkspace(data)
      } else {
        if (resp.status === 401 || resp.status === 403) {
          localStorage.removeItem("user_token")
          localStorage.removeItem("user_profile")
          localStorage.removeItem("firebase_id_token")
        }
        setError("Failed to load workspace data.")
      }
    } catch (err) {
      console.error(err)
      setError("Network error. Could not sync database.")
    } finally {
      setLoading(false)
    }
  }

  async function fetchMessages(silent = false) {
    if (!token) return
    try {
      const resp = await fetch(apiUrl("/api/workspace/messages"), {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (resp.ok) {
        const data = await resp.json()
        setChatMessages(data)
      }
    } catch (err) {
      if (!silent) console.error("Error fetching chat messages", err)
    }
  }

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!newMessage.trim() || !token) return

    setSendingMsg(true)
    const content = newMessage
    setNewMessage("")

    try {
      const resp = await fetch(apiUrl("/api/workspace/messages"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: content }),
      })

      if (resp.ok) {
        const data = await resp.json()
        setChatMessages((prev) => [...prev, data])
      }
    } catch (err) {
      console.error("Error sending message", err)
    } finally {
      setSendingMsg(false)
    }
  }

  async function handleSelectService(serviceName: string) {
    if (!token) return
    try {
      const resp = await fetch(apiUrl("/api/workspace/services"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ serviceName }),
      })

      if (resp.ok) {
        const data = await resp.json()
        setWorkspace(data)
      }
    } catch (err) {
      console.error("Error adding service", err)
    }
  }

  function triggerCheckout(name: string, price: number) {
    setCheckoutService({ name, price })
  }

  async function handleRazorpayCheckout() {
    if (!checkoutService || !token || !workspace) return
    setPaymentLoading(true)

    try {
      // 1. Dynamically load the Razorpay checkout script
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        alert("Failed to load Razorpay Checkout SDK. Please check your network connection.")
        setPaymentLoading(false)
        return
      }

      // 2. Call backend order endpoint to create real Razorpay Order
      const orderResp = await fetch(apiUrl("/api/payments/order"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: checkoutService.price, serviceName: checkoutService.name }),
      })

      if (!orderResp.ok) {
        throw new Error("Failed to create Razorpay order on backend")
      }

      const orderData = await orderResp.json()

      // 3. Initialize Razorpay options and open checkout modal
      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "KunalConnects",
        description: `Payment for ${checkoutService.name}`,
        order_id: orderData.id,
        handler: async function (response: any) {
          setPaymentLoading(true)
          try {
            // 4. Verify payment signature on backend
            const verifyResp = await fetch(apiUrl("/api/payments/verify"), {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
                serviceName: checkoutService.name,
                amount: checkoutService.price,
              }),
            })

            if (verifyResp.ok) {
              const verifyData = await verifyResp.json()
              setWorkspace(verifyData.user)
              setCheckoutService(null)
              setTab("payments") // Navigate to payments to see ledger
            } else {
              const errBody = await verifyResp.json()
              alert(`Payment verification failed: ${errBody.error || "Please try again."}`)
            }
          } catch (err: any) {
            console.error("Verification error:", err)
            alert("Verification network error. Payment could not be validated.")
          } finally {
            setPaymentLoading(false)
          }
        },
        prefill: {
          name: workspace.name,
          email: workspace.email,
          contact: workspace.brief?.phone || "",
        },
        theme: {
          color: "#b8ff38", // KunalConnects bright neon signature accent
        },
        modal: {
          ondismiss: function () {
            setPaymentLoading(false)
          },
        },
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    } catch (err: any) {
      console.error("Razorpay integration error:", err)
      alert(`Gateway connection error: ${err.message}`)
      setPaymentLoading(false)
    }
  }

  if (!token) {
    return (
      <div style={{ textAlign: "center", padding: "100px 24px", fontFamily: '"Space Grotesk", sans-serif' }}>
        <h2 style={{ fontSize: 28, marginBottom: 12 }}>Access Denied</h2>
        <p style={{ color: "#6f6a62", marginBottom: 28 }}>Please sign in with a Gmail account to view your growth workspace.</p>
        <button
          style={{
            height: 48,
            padding: "0 28px",
            background: "#151515",
            color: "#fff",
            border: "none",
            borderRadius: 24,
            fontWeight: 800,
            cursor: "pointer",
          }}
          onClick={() => window.dispatchEvent(new Event("open-google-login"))}
        >
          Sign in with Google
        </button>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{ display: "grid", placeItems: "center", height: "100vh", fontFamily: '"Space Grotesk", sans-serif' }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 40, height: 40, border: "4px solid #151515", borderTopColor: "#b8ff38", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <span>Synchronizing workspace…</span>
          <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    )
  }

  if (!workspace || !workspace.brief) {
    return (
      <div style={{ textAlign: "center", padding: "100px 24px", fontFamily: '"Space Grotesk", sans-serif', maxWidth: 600, margin: "0 auto" }}>
        <h2 style={{ fontSize: 28, marginBottom: 12 }}>No Brief Submitted</h2>
        <p style={{ color: "#6f6a62", marginBottom: 28 }}>Your workspace is ready! Submit a brief using our onboarding tool to start collaborating with service experts.</p>
        <a
          style={{
            height: 48,
            padding: "0 28px",
            background: "#151515",
            color: "#fff",
            border: "none",
            borderRadius: 24,
            fontWeight: 800,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
          }}
          href="/agent"
        >
          Build a Brief
        </a>
      </div>
    )
  }

  // Calculate milestones
  const hasBrief = !!workspace.brief
  const activeServices = workspace.services.filter((s) => s.status !== "In Discussion")
  const completedServices = workspace.services.filter((s) => s.status === "Completed")

  const m1Complete = hasBrief
  const m2Complete = activeServices.length > 0
  const m3Complete = completedServices.length > 0
  const m4Complete = completedServices.length > 0 && completedServices.length === workspace.services.length

  const totalPaid = workspace.payments.reduce((acc, p) => acc + p.amount, 0)

  return (
    <div className={styles.root}>
      {/* ─── Topbar ─── */}
      <header className={styles.topbar}>
        <div className={styles.topbarBrand}>
          <a className={styles.brandName} href="/">KunalConnects</a>
          <span className={styles.userBadge}>Workspace</span>
        </div>
        <div className={styles.topbarRight}>
          <a className={styles.backLink} href="/">
            ← Home
          </a>
          <button
            className={styles.backLink}
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={() => {
              localStorage.removeItem("user_token")
              localStorage.removeItem("user_profile")
              window.location.href = "/"
            }}
          >
            Sign out
          </button>
        </div>
      </header>

      <div className={styles.body}>
        {/* ─── Sidebar ─── */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarUpper}>
            <div className={styles.sidebarLabel}>Workspace Options</div>
            {workspaceNavItems.map(({ key, label, icon }) => (
              <button
                key={key}
                className={`${styles.sidebarItem} ${tab === key ? styles.sidebarItemActive : ""}`}
                onClick={() => setTab(key)}
              >
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 16, height: 16 }}>
                  {icon}
                </span>
                {label}
              </button>
            ))}
          </div>

          <div className={styles.sidebarProfile}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "#b8ff38",
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
              }}
            >
              {workspace.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className={styles.sidebarProfileName}>{workspace.name}</span>
              <span className={styles.sidebarProfileEmail}>{workspace.email}</span>
            </div>
          </div>
        </aside>

        {/* ─── Main Panel ─── */}
        <main className={styles.main}>
          {/* ─── TAB 1: BRIEF & PROGRESS TIMELINE ─── */}
          {tab === "brief" && (
            <>
              <div className={styles.panelHeader}>
                <h1 className={styles.panelTitle}>Brief & Delivery Progress</h1>
              </div>

              {error && (
                <div style={{ padding: 14, borderRadius: 8, background: "#fef2f2", border: "1px solid #fee2e2", color: "#dc2626", marginBottom: 20, fontWeight: 600 }}>
                  {error}
                </div>
              )}

              {/* Progress Milestones timeline */}
              <div className={styles.progressTimeline}>
                <div className={styles.progressHeader}>
                  <span>Workspace Milestone Progression</span>
                  <small style={{ fontSize: 13, background: "#151515", color: "#fff", padding: "3px 8px", borderRadius: 4 }}>
                    {m4Complete ? "Delivered" : m3Complete ? "In Sprints" : m2Complete ? "Scoping Active" : "Brief Registered"}
                  </small>
                </div>

                <div className={styles.timelineGrid}>
                  <div className={`${styles.timelineNode} ${m1Complete ? styles.timelineNodeComplete : ""} ${!m2Complete ? styles.timelineNodeActive : ""}`}>
                    <span className={styles.nodeNum}>Phase 01</span>
                    <span className={styles.nodeTitle}>Brief Submitted</span>
                    <p className={styles.nodeDesc}>Primary growth goals and phone/budget mapped.</p>
                    <span className={styles.nodeStatus} style={{ background: "#b8ff38", color: "#151515" }}>Completed</span>
                  </div>

                  <div className={`${styles.timelineNode} ${m2Complete ? styles.timelineNodeComplete : ""} ${m2Complete ? "" : m1Complete ? styles.timelineNodeActive : ""}`}>
                    <span className={styles.nodeNum}>Phase 02</span>
                    <span className={styles.nodeTitle}>Payment Update</span>
                    <p className={styles.nodeDesc}>Experts assigned to draft execution frameworks.</p>
                    <span className={styles.nodeStatus} style={m2Complete ? { background: "#b8ff38" } : { background: "#ded9d1" }}>
                      {m2Complete ? "Completed" : "In Progress"}
                    </span>
                  </div>

                  <div className={`${styles.timelineNode} ${m3Complete ? styles.timelineNodeComplete : ""} ${m3Complete ? "" : m2Complete ? styles.timelineNodeActive : ""}`}>
                    <span className={styles.nodeNum}>Phase 03</span>
                    <span className={styles.nodeTitle}>Review Sprints</span>
                    <p className={styles.nodeDesc}>Weekly execution dashboards & creative updates.</p>
                    <span className={styles.nodeStatus} style={m3Complete ? { background: "#b8ff38" } : { background: "#ded9d1" }}>
                      {m3Complete ? "Completed" : m2Complete ? "In Progress" : "Pending"}
                    </span>
                  </div>

                  <div className={`${styles.timelineNode} ${m4Complete ? styles.timelineNodeComplete : ""} ${m4Complete ? "" : m3Complete ? styles.timelineNodeActive : ""}`}>
                    <span className={styles.nodeNum}>Phase 04</span>
                    <span className={styles.nodeTitle}>Final Delivery</span>
                    <p className={styles.nodeDesc}>System assets handed over to the marketing board.</p>
                    <span className={styles.nodeStatus} style={m4Complete ? { background: "#b8ff38" } : { background: "#ded9d1" }}>
                      {m4Complete ? "Completed" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Brief Card */}
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Your Submitted Onboarding Brief</h2>
                <div className={styles.detailsGrid}>
                  <div className={styles.detailGroup}>
                    <span className={styles.detailLabel}>Company Name</span>
                    <span className={styles.detailValue}>{workspace.brief.companyName}</span>
                  </div>
                  <div className={styles.detailGroup}>
                    <span className={styles.detailLabel}>Primary Service Goal</span>
                    <span className={styles.detailValue}>{workspace.brief.primaryGoal}</span>
                  </div>
                  <div className={styles.detailGroup}>
                    <span className={styles.detailLabel}>Contact Phone</span>
                    <span className={styles.detailValue}>{workspace.brief.phone}</span>
                  </div>
                  <div className={styles.detailGroup}>
                    <span className={styles.detailLabel}>Monthly Budget Range</span>
                    <span className={styles.detailValue}>{workspace.brief.budget}</span>
                  </div>
                  <div className={styles.detailGroup} style={{ gridColumn: "1 / -1" }}>
                    <span className={styles.detailLabel}>Bottleneck & Solutions Details</span>
                    <p className={styles.detailDesc}>{workspace.brief.details}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ─── TAB 2: SELECT SERVICES & BUY ─── */}
          {tab === "services" && (
            <>
              <div className={styles.panelHeader}>
                <h1 className={styles.panelTitle}>Select Additional Growth Services</h1>
              </div>

              <div className={styles.servicesGrid}>
                {servicePages.map((serv) => {
                  // Check if this service is in workspace list
                  const added = workspace.services.find((s) => s.name === serv.name)

                  let badgeBg = "#ded9d1"
                  let badgeText = "#151515"
                  let buttonEl = null

                  if (!added) {
                    buttonEl = (
                      <button className={styles.selectBtn} onClick={() => handleSelectService(serv.name)}>
                        Add to Discussion Suite
                      </button>
                    )
                  } else {
                    if (added.status === "In Discussion") {
                      badgeBg = "rgba(21,21,21,0.06)"
                      badgeText = "#6f6a62"
                      buttonEl = (
                        <button className={styles.selectBtnMuted} disabled>
                          Admin Aligning Quote
                        </button>
                      )
                    } else if (added.status === "Pending Payment") {
                      badgeBg = "#b8ff38"
                      badgeText = "#fff"
                      const payablePrice = added.price
                      buttonEl = (
                        <button className={styles.selectBtn} style={{ background: "#b8ff38" }} onClick={() => triggerCheckout(serv.name, payablePrice)}>
                          Pay with Razorpay (₹{payablePrice.toLocaleString("en-IN")})
                        </button>
                      )
                    } else if (added.status === "In Progress") {
                      badgeBg = "#b8ff38"
                      badgeText = "#151515"
                      buttonEl = (
                        <button className={styles.selectBtnMuted} disabled style={{ color: "#151515", background: "#b8ff38" }}>
                          Active - In Progress
                        </button>
                      )
                    } else if (added.status === "Completed") {
                      badgeBg = "#b8ff38"
                      badgeText = "#151515"
                      buttonEl = (
                        <button className={styles.selectBtnMuted} disabled style={{ color: "#151515", borderColor: "#151515" }}>
                          Delivered & Closed
                        </button>
                      )
                    }
                  }

                  return (
                    <div className={styles.serviceCard} key={serv.name}>
                      <div className={styles.serviceCardHeader}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                          <h3 className={styles.serviceName}>{serv.name}</h3>
                          {added && (
                            <span className={styles.serviceStatusBadge} style={{ background: badgeBg, color: badgeText }}>
                              {added.status}
                            </span>
                          )}
                        </div>
                        <p className={styles.serviceDesc}>{serv.description}</p>
                        
                        <div className={styles.servicePriceTag}>
                          <span className={styles.priceAmount}>
                            {added ? (added.price > 0 ? `₹${added.price.toLocaleString("en-IN")}` : "Price set during discussion") : "No upfront price"}
                          </span>
                        </div>
                      </div>

                      {buttonEl}
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {/* ─── TAB 3: WORKSPACE MESSAGES CHAT ─── */}
          {tab === "messages" && (
            <>
              <div className={styles.panelHeader}>
                <h1 className={styles.panelTitle}>Expert Workspace Chat</h1>
              </div>

              <div className={styles.chatContainer}>
                <div className={styles.chatHeader}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#b8ff38" }} />
                  <div className={styles.chatHeaderInfo}>
                    <span className={styles.chatTitle}>Kunal Connects Pod Coordinator</span>
                    <span className={styles.chatSub}>Direct messaging line to project team</span>
                  </div>
                </div>

                <div className={styles.chatMessages}>
                  {chatMessages.length === 0 ? (
                    <div style={{ textAlign: "center", color: "#6f6a62", padding: "40px 0" }}>
                      <p>Start a thread! Ask Kunal or your service coordinator anything about your brand milestones.</p>
                    </div>
                  ) : (
                    chatMessages.map((msg) => {
                      const isMe = msg.sender === "user"
                      const bubbleStyle = isMe ? styles.bubbleRight : styles.bubbleLeft
                      const timeStyle = isMe ? styles.chatTime : styles.chatTimeLeft
                      const formattedTime = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

                      return (
                        <div key={msg._id} className={bubbleStyle}>
                          {msg.message}
                          <span className={timeStyle}>{formattedTime}</span>
                        </div>
                      )
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form className={styles.chatInputRow} onSubmit={handleSendMessage}>
                  <input
                    className={styles.chatInput}
                    type="text"
                    placeholder="Ask KunalConnects anything about your project..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    disabled={sendingMsg}
                  />
                  <button className={styles.chatSendBtn} type="submit" disabled={!newMessage.trim() || sendingMsg}>
                    {sendingMsg ? "..." : "➔"}
                  </button>
                </form>
              </div>
            </>
          )}

          {/* ─── TAB 4: PAYMENTS LEDGER ─── */}
          {tab === "payments" && (
            <>
              <div className={styles.panelHeader}>
                <h1 className={styles.panelTitle}>Payment History & Ledger</h1>
              </div>

              <div className={styles.paymentActionsCard}>
                <div className={styles.paymentActionsHeader}>
                  <div>
                    <div className={styles.paymentActionsLabel}>Outstanding Payments</div>
                    <h2 className={styles.paymentActionsTitle}>Pay the price agreed during discussion</h2>
                  </div>
                  <div className={styles.paymentActionsHeaderRight}>
                    <div className={styles.paymentActionsSummary}>
                      ₹{workspace.services.filter((s) => s.status === "Pending Payment").reduce((sum, service) => sum + service.price, 0).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>

                {workspace.services.filter((s) => s.status === "Pending Payment").length === 0 ? (
                  <div className={styles.emptyState} style={{ padding: "20px 0 0", textAlign: "left" }}>
                    No services are currently marked as pending payment.
                  </div>
                ) : (
                  <div className={styles.paymentActionsList}>
                    {workspace.services
                      .filter((s) => s.status === "Pending Payment")
                      .map((service) => {
                        const payablePrice = service.price

                        return (
                          <div key={service.name} className={styles.paymentActionItem}>
                            <div>
                              <div className={styles.paymentActionName}>{service.name}</div>
                              <div className={styles.paymentActionMeta}>
                                {payablePrice > 0 ? `Agreed amount: ₹${payablePrice.toLocaleString("en-IN")}` : "Awaiting admin price"}
                              </div>
                            </div>
                            <button
                              className={styles.selectBtn}
                              style={{ minWidth: 190, background: "#dc2626", color: "#fff" }}
                              onClick={() => triggerCheckout(service.name, payablePrice)}
                            >
                              Pay with Razorpay
                            </button>
                          </div>
                        )
                      })}
                  </div>
                )}
              </div>

              <div className={styles.statsRow}>
                <div className={styles.statCard}>
                  <div className={styles.statNum} style={{ color: "#b8ff38", textShadow: "0 0 1px #151515" }}>
                    ₹{totalPaid.toLocaleString("en-IN")}
                  </div>
                  <div className={styles.statLabel}>Total Paid to Date</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>{workspace.payments.length}</div>
                  <div className={styles.statLabel}>Invoices Cleared</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>₹{workspace.services.filter((s) => s.status === "Pending Payment").reduce((a, b) => a + b.price, 0).toLocaleString("en-IN")}</div>
                  <div className={styles.statLabel}>Due Payments</div>
                </div>
              </div>

              {workspace.payments.length === 0 ? (
                <div className={styles.emptyState}>No payments cleared yet. Select and pay for scoping services inside "Select Services" tab.</div>
              ) : (
                <table className={styles.ledgerTable}>
                  <thead className={styles.thead}>
                    <tr>
                      <th className={styles.th}>Service Name</th>
                      <th className={styles.th}>Payment Reference</th>
                      <th className={styles.th}>Paid Date</th>
                      <th className={styles.th}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workspace.payments.map((pay) => (
                      <tr key={pay.paymentId}>
                        <td className={styles.tdBold}>{pay.serviceName}</td>
                        <td className={styles.td} style={{ fontFamily: "monospace", fontSize: 13, color: "#6f6a62" }}>
                          {pay.paymentId}
                          <br />
                          <small style={{ opacity: 0.7 }}>Order ID: {pay.orderId}</small>
                        </td>
                        <td className={styles.td} style={{ fontSize: 13, color: "#6f6a62" }}>
                          {new Date(pay.date).toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" })}
                        </td>
                        <td className={styles.tdBold} style={{ fontSize: 15 }}>
                          ₹{pay.amount.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </main>

        <nav className={styles.mobileNav} aria-label="Workspace navigation">
          {workspaceNavItems.map(({ key, label, icon }) => (
            <button
              key={key}
              className={`${styles.mobileNavItem} ${tab === key ? styles.mobileNavItemActive : ""}`}
              onClick={() => setTab(key)}
              aria-current={tab === key ? "page" : undefined}
              type="button"
            >
              <span className={styles.mobileNavIcon}>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* ─── REAL RAZORPAY CHECKOUT CONFIRMATION DRAWER ─── */}
      {checkoutService && (
        <div className={styles.loginOverlay} style={{ zIndex: 1200 }} onClick={() => !paymentLoading && setCheckoutService(null)}>
          <div className={styles.loginModal} style={{ padding: 0, overflow: "hidden", maxWidth: 400 }} onClick={(e) => e.stopPropagation()}>
            
            {/* Branded Header */}
            <div style={{ background: "#151515", color: "#fff", padding: "24px 28px", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 17, fontFamily: '"Space Grotesk", sans-serif' }}>KunalConnects</h3>
                <span style={{ fontSize: 12, opacity: 0.7 }}>Secure Checkout</span>
              </div>
              <div style={{ background: "#b8ff38", color: "#151515", fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 4 }}>
                SECURE GATEWAY
              </div>
            </div>

            <div style={{ padding: "28px 28px 24px", width: "100%" }}>
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: 12, color: "#6f6a62", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>Paying For</span>
                <h4 style={{ margin: "4px 0 0", fontSize: 18, fontWeight: 800 }}>{checkoutService.name}</h4>
                <div style={{ fontSize: 24, fontWeight: 900, marginTop: 8, color: "#151515" }}>
                  ₹{checkoutService.price.toLocaleString("en-IN")}
                </div>
              </div>

              <div style={{ borderTop: "1px solid #ded9d1", paddingTop: 16, marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 24 }}>🛡️</span>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 700, display: "block", color: "#151515" }}>Razorpay Secured Checkout</span>
                    <span style={{ fontSize: 12, color: "#6f6a62", display: "block" }}>All major cards, UPI, netbanking and wallets supported.</span>
                  </div>
                </div>
                <div style={{ background: "#fffdec", border: "1px dashed #eab308", padding: "10px 14px", borderRadius: 8, fontSize: 12, color: "#854d0e", fontWeight: 600 }}>
                  💡 Secure payments are encrypted and verified automatically.
                </div>
              </div>

              <button
                className={styles.loginSubmitBtn}
                style={{ height: 48, background: "#151515", borderRadius: 24 }}
                onClick={handleRazorpayCheckout}
                disabled={paymentLoading}
              >
                {paymentLoading ? (
                  <>
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        border: "2px solid #fff",
                        borderTopColor: "#b8ff38",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                    Initiating Secure Gate…
                  </>
                ) : (
                  `Pay ₹${checkoutService.price.toLocaleString("en-IN")}`
                )}
              </button>

              {!paymentLoading && (
                <button
                  style={{
                    background: "none",
                    border: "none",
                    color: "#6f6a62",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "block",
                    margin: "12px auto 0",
                    textDecoration: "underline",
                  }}
                  onClick={() => setCheckoutService(null)}
                >
                  Cancel Payment
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
