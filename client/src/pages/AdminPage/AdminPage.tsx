import { useState, useEffect, useRef } from "react"
import type { ReactNode } from "react"
import { AdminLogin } from "./AdminLogin"
import { apiUrl } from "../../data/api"
import { WorkspaceBriefIcon, WorkspaceServicesIcon, WorkspacePaymentsIcon } from "../../styles/Icons"
import * as styles from "./AdminPage.css"

/* ─── Types ─────────────────────────────────────────────────── */
type Story = {
  _id: string
  title: string
  category: string
  excerpt: string
  link: string
  image: string
}

type FeedItem = {
  _id: string
  title: string
  meta: string
  text: string
}

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

type ClientWorkspace = {
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

type Tab = "stories" | "feed" | "messages" | "clients"

/* ─── Blank templates ────────────────────────────────────────── */
const blankStory = (): Omit<Story, "_id"> => ({
  title: "", category: "", excerpt: "", link: "", image: "",
})

const blankFeed = (): Omit<FeedItem, "_id"> => ({
  title: "", meta: "", text: "",
})

/* ─── Component ──────────────────────────────────────────────── */
export function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState<Tab>("stories")

  // API Lists
  const [stories, setStories] = useState<Story[]>([])
  const [feed, setFeed] = useState<FeedItem[]>([])
  // Commented out as currently unused but kept for future message panel work
  // const [messages, setMessages] = useState<Message[]>([])
  const [clients, setClients] = useState<ClientWorkspace[]>([])

  // Modal / Draft states
  const [storyModal, setStoryModal] = useState<Partial<Story> | null>(null)
  const [storyDraft, setStoryDraft] = useState<Omit<Story, "_id"> | null>(null)

  const [feedModal, setFeedModal] = useState<Partial<FeedItem> | null>(null)
  const [feedDraft, setFeedDraft] = useState<Omit<FeedItem, "_id"> | null>(null)

  // Client Details panel
  const [selectedClient, setSelectedClient] = useState<ClientWorkspace | null>(null)
  const [clientMessages, setClientMessages] = useState<ChatMessage[]>([])
  const [adminReply, setAdminReply] = useState("")
  const [sendingReply, setSendingReply] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Price/Status edits
  const [editingService, setEditingService] = useState<string | null>(null)
  const [servicePrice, setServicePrice] = useState(0)
  const [serviceStatus, setServiceStatus] = useState<any>("In Discussion")

  const adminNavItems = [
    {
      key: "stories",
      label: "Top Stories",
                icon: <WorkspaceBriefIcon width={16} height={16} />,
    },
    {
      key: "feed",
      label: "Live Feed",
                icon: <WorkspaceServicesIcon width={16} height={16} />,
    },
    {
      key: "clients",
      label: "Client Workspaces",
                icon: <WorkspacePaymentsIcon width={16} height={16} />,
    },
  ] as { key: Tab; label: string; icon: ReactNode }[]

  useEffect(() => {
    // Check local storage for token
    const token = localStorage.getItem("admin_token")
    if (token) {
      setAuthed(true)
    }
  }, [])

  useEffect(() => {
    if (authed) {
      fetchStories()
      fetchFeed()
      // Commented out as currently unused but kept for future message panel work
      // fetchMessages()
      fetchClients()
    }
  }, [authed])

  useEffect(() => {
    if (selectedClient) {
      fetchClientMessages()
      const interval = setInterval(() => {
        fetchClientMessages(true)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [selectedClient])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [clientMessages])

  const token = localStorage.getItem("admin_token")
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }

  // --- CRUD: Stories ---
  async function fetchStories() {
    try {
      const resp = await fetch(apiUrl("/api/stories"))
      if (resp.ok) setStories(await resp.json())
    } catch (err) {
      console.error(err)
    }
  }

  async function saveStory() {
    if (!storyDraft || !storyModal) return
    const isNew = !storyModal._id
    const url = isNew
      ? apiUrl("/api/stories")
      : apiUrl(`/api/stories/${storyModal._id}`)

    try {
      const resp = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers,
        body: JSON.stringify(storyDraft),
      })
      if (resp.ok) {
        fetchStories()
        setStoryModal(null)
        setStoryDraft(null)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function handleDeleteStory(id: string) {
    if (!confirm("Are you sure you want to delete this story?")) return
    try {
      const resp = await fetch(apiUrl(`/api/stories/${id}`), {
        method: "DELETE",
        headers,
      })
      if (resp.ok) fetchStories()
    } catch (err) {
      console.error(err)
    }
  }

  // --- CRUD: Feed ---
  async function fetchFeed() {
    try {
      const resp = await fetch(apiUrl("/api/feed"))
      if (resp.ok) setFeed(await resp.json())
    } catch (err) {
      console.error(err)
    }
  }

  async function saveFeed() {
    if (!feedDraft || !feedModal) return
    const isNew = !feedModal._id
    const url = isNew
      ? apiUrl("/api/feed")
      : apiUrl(`/api/feed/${feedModal._id}`)

    try {
      const resp = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers,
        body: JSON.stringify(feedDraft),
      })
      if (resp.ok) {
        fetchFeed()
        setFeedModal(null)
        setFeedDraft(null)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function handleDeleteFeed(id: string) {
    if (!confirm("Are you sure you want to delete this feed signal?")) return
    try {
      const resp = await fetch(apiUrl(`/api/feed/${id}`), {
        method: "DELETE",
        headers,
      })
      if (resp.ok) fetchFeed()
    } catch (err) {
      console.error(err)
    }
  }


  async function fetchClients() {
    try {
      const resp = await fetch(apiUrl("/api/workspace/admin/workspaces"), { headers })
      if (resp.ok) setClients(await resp.json())
    } catch (err) {
      console.error(err)
    }
  }

  async function fetchClientMessages(silent = false) {
    if (!selectedClient) return
    try {
      const resp = await fetch(apiUrl(`/api/workspace/admin/workspaces/${selectedClient._id}/messages`), { headers })
      if (resp.ok) setClientMessages(await resp.json())
    } catch (err) {
      if (!silent) console.error(err)
    }
  }

  async function handleSendReply(e: React.FormEvent) {
    e.preventDefault()
    if (!adminReply.trim() || !selectedClient) return

    setSendingReply(true)
    const content = adminReply
    setAdminReply("")

    try {
      const resp = await fetch(apiUrl(`/api/workspace/admin/workspaces/${selectedClient._id}/messages`), {
        method: "POST",
        headers,
        body: JSON.stringify({ message: content }),
      })
      if (resp.ok) {
        const data = await resp.json()
        setClientMessages((prev) => [...prev, data])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSendingReply(false)
    }
  }

  async function handleUpdateService(serviceName: string) {
    if (!selectedClient) return
    try {
      const resp = await fetch(apiUrl(`/api/workspace/admin/workspaces/${selectedClient._id}/services`), {
        method: "POST",
        headers,
        body: JSON.stringify({
          serviceName,
          price: servicePrice,
          status: serviceStatus,
        }),
      })

      if (resp.ok) {
        const data = await resp.json()
        setSelectedClient(data)
        setEditingService(null)
        fetchClients()
      }
    } catch (err) {
      console.error(err)
    }
  }

  function handleLoginSuccess(adminToken: string) {
    localStorage.setItem("admin_token", adminToken)
    setAuthed(true)
  }

  // Commented out as currently unused but kept for future message panel work
  // const unreadCount = messages.filter((m) => !m.read).length

  if (!authed) return <AdminLogin onLogin={handleLoginSuccess} />

  return (
    <div className={styles.root}>
      {/* ── Topbar ── */}
      <header className={styles.topbar}>
        <div className={styles.topbarBrand}>
          <span className={styles.brandName}>KunalConnects</span>
          <span className={styles.adminBadge}>Admin</span>
        </div>
        <div className={styles.topbarRight}>
          <a className={styles.backLink} href="/">
            ← Back to site
          </a>
          <button
            className={styles.backLink}
            style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit" }}
            onClick={() => {
              localStorage.removeItem("admin_token")
              setAuthed(false)
            }}
          >
            Sign out
          </button>
        </div>
      </header>

      <div className={styles.body}>
        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarLabel}>Manage</div>
          {adminNavItems.map(({ key, label, icon }) => (
            <button
              key={key}
              className={`${styles.sidebarItem} ${tab === key ? styles.sidebarItemActive : ""}`}
              onClick={() => {
                setTab(key)
                setSelectedClient(null)
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 16, height: 16 }}>
                {icon}
              </span>
              {label}
            </button>
          ))}
        </aside>

        {/* ── Main content ── */}
        <main className={styles.main}>
          {/* ── TAB: TOP STORIES ── */}
          {tab === "stories" && (
            <>
              <div className={styles.statsRow}>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>{stories.length}</div>
                  <div className={styles.statLabel}>Total Stories</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>{[...new Set(stories.map((s) => s.category))].length}</div>
                  <div className={styles.statLabel}>Categories</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>{stories.filter((s) => s.image).length}</div>
                  <div className={styles.statLabel}>With Image</div>
                </div>
              </div>

              <div className={styles.panelHeader}>
                <h1 className={styles.panelTitle}>Top Stories</h1>
                <button
                  className={styles.addBtn}
                  onClick={() => {
                    setStoryModal({ _id: "" })
                    setStoryDraft(blankStory())
                  }}
                >
                  + Add Story
                </button>
              </div>

              {stories.length === 0 ? (
                <div className={styles.emptyState}>No stories yet. Click "+ Add Story" to create one.</div>
              ) : (
                <table className={styles.table}>
                  <thead className={styles.thead}>
                    <tr>
                      <th className={styles.th}>Title</th>
                      <th className={styles.th}>Category</th>
                      <th className={styles.th}>Excerpt</th>
                      <th className={styles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stories.map((s) => (
                      <tr key={s._id} className={styles.trAnim}>
                        <td className={styles.td} style={{ maxWidth: 240 }}>{s.title}</td>
                        <td className={styles.td}>
                          <span className={styles.categoryBadge}>{s.category}</span>
                        </td>
                        <td className={`${styles.td} ${styles.tdMuted}`} style={{ maxWidth: 200 }}>{s.excerpt}</td>
                        <td className={styles.td}>
                          <div className={styles.rowActions}>
                            <button
                              className={styles.iconBtn}
                              onClick={() => {
                                setStoryModal(s)
                                setStoryDraft({ title: s.title, category: s.category, excerpt: s.excerpt, link: s.link, image: s.image })
                              }}
                            >
                              ✏️
                            </button>
                            <button className={styles.dangerBtn} onClick={() => handleDeleteStory(s._id)}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {/* ── TAB: LIVE FEED ── */}
          {tab === "feed" && (
            <>
              <div className={styles.statsRow}>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>{feed.length}</div>
                  <div className={styles.statLabel}>Active Signals</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>{[...new Set(feed.map((f) => f.meta.split("·")[0].trim()))].length}</div>
                  <div className={styles.statLabel}>Cities</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>Live</div>
                  <div className={styles.statLabel}>Status</div>
                </div>
              </div>

              <div className={styles.panelHeader}>
                <h1 className={styles.panelTitle}>Live Feed</h1>
                <button
                  className={styles.addBtn}
                  onClick={() => {
                    setFeedModal({ _id: "" })
                    setFeedDraft(blankFeed())
                  }}
                >
                  + Add Signal
                </button>
              </div>

              {feed.length === 0 ? (
                <div className={styles.emptyState}>No feed items yet. Click "+ Add Signal" to create one.</div>
              ) : (
                <table className={styles.table}>
                  <thead className={styles.thead}>
                    <tr>
                      <th className={styles.th}>Title</th>
                      <th className={styles.th}>Meta</th>
                      <th className={styles.th}>Description</th>
                      <th className={styles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feed.map((f) => (
                      <tr key={f._id} className={styles.trAnim}>
                        <td className={styles.td} style={{ maxWidth: 220 }}>{f.title}</td>
                        <td className={`${styles.td} ${styles.tdMuted}`}>{f.meta}</td>
                        <td className={`${styles.td} ${styles.tdMuted}`} style={{ maxWidth: 200 }}>{f.text}</td>
                        <td className={styles.td}>
                          <div className={styles.rowActions}>
                            <button
                              className={styles.iconBtn}
                              onClick={() => {
                                setFeedModal(f)
                                setFeedDraft({ title: f.title, meta: f.meta, text: f.text })
                              }}
                            >
                              ✏️
                            </button>
                            <button className={styles.dangerBtn} onClick={() => handleDeleteFeed(f._id)}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

        

          {/* ── TAB: ACTIVE CLIENT WORKSPACES ── */}
          {tab === "clients" && !selectedClient && (
            <>
              <div className={styles.panelHeader}>
                <h1 className={styles.panelTitle}>Registered Growth Workspaces</h1>
              </div>

              {clients.length === 0 ? (
                <div className={styles.emptyState}>No registered workspaces found.</div>
              ) : (
                <div className={styles.clientGrid}>
                  {clients.map((c) => (
                    <div className={styles.clientCard} key={c._id} onClick={() => setSelectedClient(c)}>
                      <div className={styles.clientHeader}>
                        <div>
                          <h3 className={styles.clientTitle}>{c.name}</h3>
                          <span className={styles.clientCompany}>{c.brief?.companyName || "No Brief Set"}</span>
                        </div>
                        <span style={{ fontSize: 13, background: "#151515", color: "#fff", padding: "4px 10px", borderRadius: 12 }}>
                          {c.services.length} Services
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, borderTop: "1px solid #ded9d1", paddingTop: 10 }}>
                        <span style={{ color: "#6f6a62" }}>{c.email}</span>
                        <strong>₹{(c.payments.reduce((a, b) => a + b.amount, 0)).toLocaleString("en-IN")} Paid</strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── CLIENT DETAILS DRILLDOWN PANEL ── */}
          {tab === "clients" && selectedClient && (
            <div>
              <div className={styles.panelHeader} style={{ marginBottom: 20 }}>
                <div>
                  <button
                    style={{ background: "none", border: "none", textDecoration: "underline", color: "#6f6a62", cursor: "pointer", fontSize: 13, fontWeight: 700, padding: 0, marginBottom: 8 }}
                    onClick={() => { setSelectedClient(null); setEditingService(null); }}
                  >
                    ← Back to Clients list
                  </button>
                  <h1 className={styles.panelTitle}>{selectedClient.name}'s Workspace Workspace</h1>
                </div>
                <div style={{ display: "flex", gap: 14, fontSize: 14 }}>
                  <span>Brief Status: <strong style={{ color: "#dc2626" }}>Active</strong></span>
                </div>
              </div>

              <div className={styles.workspaceContainer}>
                {/* Left side: Services controls and brief details */}
                <div>
                  {selectedClient.brief && (
                    <div className={styles.serviceCtrlBox} style={{ background: "#fff", border: "1px solid #ded9d1", marginBottom: 24 }}>
                      <h3 style={{ margin: "0 0 12px", fontSize: 16 }}>Onboarding Brief Details</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13.5 }}>
                        <div><strong>Company:</strong> {selectedClient.brief.companyName}</div>
                        <div><strong>Goal:</strong> {selectedClient.brief.primaryGoal}</div>
                        <div><strong>Phone:</strong> {selectedClient.brief.phone}</div>
                        <div><strong>Budget Range:</strong> {selectedClient.brief.budget}</div>
                        <div><strong>Obstacle Obstacles:</strong> <p style={{ margin: "4px 0", color: "#6f6a62", lineHeight: 1.4 }}>{selectedClient.brief.details}</p></div>
                      </div>
                    </div>
                  )}

                  <h3 style={{ fontSize: 16, margin: "0 0 12px" }}>Active Workspace Services Suite</h3>
                  {selectedClient.services.length === 0 ? (
                    <p style={{ color: "#6f6a62", fontSize: 14 }}>No services added to client's dashboard yet.</p>
                  ) : (
                    selectedClient.services.map((serv) => (
                      <div className={styles.serviceCtrlBox} key={serv.name}>
                        <div className={styles.serviceCtrlHeader}>
                          <span>{serv.name}</span>
                          <span style={{ fontSize: 11, background: serv.paid ? "#b8ff38" : "#fecaca", padding: "2px 8px", borderRadius: 4 }}>
                            {serv.paid ? "PAID" : "UNPAID"} ({serv.status})
                          </span>
                        </div>

                        {editingService === serv.name ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
                            <div className={styles.formRow}>
                              <label style={{ display: "grid", gap: 4, fontSize: 12, fontWeight: 700 }}>
                                Price (INR ₹)
                                <input
                                  className={styles.input}
                                  style={{ height: 34 }}
                                  type="number"
                                  value={servicePrice}
                                  onChange={(e) => setServicePrice(parseInt(e.target.value) || 0)}
                                />
                              </label>

                              <label style={{ display: "grid", gap: 4, fontSize: 12, fontWeight: 700 }}>
                                Workspace Status
                                <select
                                  style={{ height: 34, border: "1px solid #ded9d1", borderRadius: 6, padding: "0 8px", background: "#fff" }}
                                  value={serviceStatus}
                                  onChange={(e: any) => setServiceStatus(e.target.value)}
                                >
                                  <option value="In Discussion">In Discussion</option>
                                  <option value="Pending Payment">Pending Payment</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Completed">Completed</option>
                                </select>
                              </label>
                            </div>
                            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                              <button
                                style={{ height: 32, padding: "0 14px", background: "#151515", color: "#fff", border: "none", borderRadius: 6, fontWeight: 700, cursor: "pointer", fontSize: 12 }}
                                onClick={() => handleUpdateService(serv.name)}
                              >
                                Save Changes
                              </button>
                              <button
                                style={{ height: 32, padding: "0 14px", border: "1px solid #ded9d1", background: "none", borderRadius: 6, cursor: "pointer", fontSize: 12 }}
                                onClick={() => setEditingService(null)}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                            <span style={{ fontSize: 15, fontWeight: 700 }}>
                              ₹{serv.price.toLocaleString("en-IN")}
                            </span>
                            <button
                              style={{ height: 28, padding: "0 12px", border: "1px solid #151515", background: "none", borderRadius: 6, fontWeight: 700, cursor: "pointer", fontSize: 11 }}
                              onClick={() => {
                                setEditingService(serv.name)
                                setServicePrice(serv.price)
                                setServiceStatus(serv.status)
                              }}
                            >
                              Edit Scoping & Price
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Right side: Client live chat */}
                <div>
                  <h3 style={{ fontSize: 16, margin: "0 0 12px" }}>Direct Client Chat</h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: 440,
                      border: "1px solid #ded9d1",
                      borderRadius: 12,
                      overflow: "hidden",
                      background: "#fff",
                    }}
                  >
                    <div style={{ flex: 1, padding: 16, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
                      {clientMessages.length === 0 ? (
                        <div style={{ textAlign: "center", color: "#6f6a62", padding: "40px 0", fontSize: 13 }}>
                          No messages in workspace thread yet. Write a message below to initialize.
                        </div>
                      ) : (
                        clientMessages.map((msg) => {
                          const isAdmin = msg.sender === "admin"
                          return (
                            <div
                              key={msg._id}
                              style={{
                                alignSelf: isAdmin ? "flex-end" : "flex-start",
                                background: isAdmin ? "#151515" : "#f6f3ee",
                                color: isAdmin ? "#fff" : "#151515",
                                padding: "10px 14px",
                                borderRadius: isAdmin ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                                maxWidth: "80%",
                                fontSize: 13.5,
                                lineHeight: 1.4,
                              }}
                            >
                              {msg.message}
                              <small style={{ display: "block", textAlign: "right", fontSize: 9, opacity: 0.6, marginTop: 4 }}>
                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </small>
                            </div>
                          )
                        })
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    <form
                      onSubmit={handleSendReply}
                      style={{ padding: 12, borderTop: "1px solid #ded9d1", display: "flex", gap: 8, background: "#f6f3ee" }}
                    >
                      <input
                        style={{ flex: 1, height: 38, border: "1px solid #ded9d1", borderRadius: 19, padding: "0 14px", fontSize: 13, outline: "none", background: "#fff" }}
                        type="text"
                        placeholder="Reply to client in workspace..."
                        value={adminReply}
                        onChange={(e) => setAdminReply(e.target.value)}
                        disabled={sendingReply}
                      />
                      <button
                        style={{ width: 38, height: 38, borderRadius: "50%", background: "#151515", color: "#fff", border: "none", cursor: "pointer", display: "grid", placeItems: "center" }}
                        type="submit"
                        disabled={!adminReply.trim() || sendingReply}
                      >
                        ➔
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        <nav className={styles.mobileNav} aria-label="Admin navigation">
          {adminNavItems.map(({ key, label, icon }) => (
            <button
              key={key}
              className={`${styles.mobileNavItem} ${tab === key ? styles.mobileNavItemActive : ""}`}
              onClick={() => {
                setTab(key)
                setSelectedClient(null)
              }}
              aria-current={tab === key ? "page" : undefined}
              type="button"
            >
              <span className={styles.mobileNavIcon}>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* ── Story modal ── */}
      {storyModal && storyDraft && (
        <div className={styles.overlay} onClick={() => { setStoryModal(null); setStoryDraft(null) }}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>{!storyModal._id ? "Add Story" : "Edit Story"}</h2>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                Title
                <input className={styles.input} value={storyDraft.title}
                  onChange={(e) => setStoryDraft({ ...storyDraft, title: e.target.value })} />
              </label>
              <label className={styles.label}>
                Category
                <input className={styles.input} value={storyDraft.category}
                  onChange={(e) => setStoryDraft({ ...storyDraft, category: e.target.value })} />
              </label>
              <label className={styles.label}>
                Excerpt
                <textarea className={styles.textarea} value={storyDraft.excerpt}
                  onChange={(e) => setStoryDraft({ ...storyDraft, excerpt: e.target.value })} />
              </label>
              <label className={styles.label}>
                Link URL
                <input className={styles.input} value={storyDraft.link}
                  onChange={(e) => setStoryDraft({ ...storyDraft, link: e.target.value })} />
              </label>
              <label className={styles.label}>
                Image URL
                <input className={styles.input} value={storyDraft.image}
                  onChange={(e) => setStoryDraft({ ...storyDraft, image: e.target.value })} />
              </label>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => { setStoryModal(null); setStoryDraft(null) }}>Cancel</button>
              <button className={styles.saveBtn} onClick={saveStory}>Save Story</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Feed modal ── */}
      {feedModal && feedDraft && (
        <div className={styles.overlay} onClick={() => { setFeedModal(null); setFeedDraft(null) }}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>{!feedModal._id ? "Add Signal" : "Edit Signal"}</h2>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>
                Title
                <input className={styles.input} value={feedDraft.title}
                  onChange={(e) => setFeedDraft({ ...feedDraft, title: e.target.value })} />
              </label>
              <label className={styles.label}>
                Meta (City · Type · Time)
                <input className={styles.input} value={feedDraft.meta}
                  onChange={(e) => setFeedDraft({ ...feedDraft, meta: e.target.value })} placeholder="Mumbai · Growth · 5 min ago" />
              </label>
              <label className={styles.label}>
                Description
                <textarea className={styles.textarea} value={feedDraft.text}
                  onChange={(e) => setFeedDraft({ ...feedDraft, text: e.target.value })} />
              </label>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => { setFeedModal(null); setFeedDraft(null) }}>Cancel</button>
              <button className={styles.saveBtn} onClick={saveFeed}>Save Signal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
