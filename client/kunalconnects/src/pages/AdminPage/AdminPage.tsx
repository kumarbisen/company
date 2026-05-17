import { useState } from "react"
import { feedItems as initialFeed, topStories as initialStories } from "../../data/site"
import { AdminLogin } from "./AdminLogin"
import * as styles from "./AdminPage.css"

/* ─── Types ─────────────────────────────────────────────────── */
type Story = {
  id: number
  title: string
  category: string
  excerpt: string
  link: string
  image: string
}

type FeedItem = {
  id: number
  title: string
  meta: string
  text: string

}

type Message = {
  id: number
  name: string
  subject: string
  preview: string
  time: string
  unread: boolean
}

type Tab = "stories" | "feed" | "messages"

/* ─── Seed data ──────────────────────────────────────────────── */
const seedStories: Story[] = initialStories.map((s, i) => ({ ...s, id: i + 1 }))
const seedFeed: FeedItem[] = initialFeed.map((f, i) => ({ ...f, id: i + 1 }))
const seedMessages: Message[] = [
  {
    id: 1,
    name: "Aryan Kapoor",
    subject: "Inquiry: Social media growth package",
    preview: "Hi, I run a D2C skincare brand based in Mumbai. Would love to understand your paid social offering in more detail before we schedule a call.",
    time: "10 min ago",
    unread: true,
  },
  {
    id: 2,
    name: "Priya Sharma",
    subject: "CRM setup for our service agency",
    preview: "We have about 40 active clients and our follow-up process is completely manual. Looking for a CRM automation system urgently.",
    time: "38 min ago",
    unread: true,
  },
  {
    id: 3,
    name: "Rahul Nair",
    subject: "Partnership proposal",
    preview: "I'm a freelance media buyer and I'd love to explore a referral partnership arrangement. Happy to jump on a call this week.",
    time: "2 hrs ago",
    unread: false,
  },
  {
    id: 4,
    name: "Sneha Joshi",
    subject: "Landing page quote request",
    preview: "Looking for a high-converting landing page for our Bengaluru-based fitness coaching brand. Budget is flexible, timeline is 3 weeks.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 5,
    name: "Vikram Mehta",
    subject: "Re: Weekly reporting cadence",
    preview: "Thanks for the overview call. I've reviewed the proposal and I'm happy to proceed. Please share the onboarding document when ready.",
    time: "2 days ago",
    unread: false,
  },
]

/* ─── Blank templates ────────────────────────────────────────── */
const blankStory = (): Omit<Story, "id"> => ({
  title: "", category: "", excerpt: "", link: "", image: "",
})

const blankFeed = (): Omit<FeedItem, "id"> => ({
  title: "", meta: "", text: "",
})

/* ─── Component ──────────────────────────────────────────────── */
export function AdminPage() {
  /* Auth must be first — but ALL hooks must be declared before any early return */
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState<Tab>("stories")

  /* Stories state */
  const [stories, setStories] = useState<Story[]>(seedStories)
  const [storyModal, setStoryModal] = useState<Story | null>(null)
  const [storyDraft, setStoryDraft] = useState<Omit<Story, "id"> | null>(null)
  const [storyIdCounter, setStoryIdCounter] = useState(seedStories.length + 1)

  /* Feed state */
  const [feed, setFeed] = useState<FeedItem[]>(seedFeed)
  const [feedModal, setFeedModal] = useState<FeedItem | null>(null)
  const [feedDraft, setFeedDraft] = useState<Omit<FeedItem, "id"> | null>(null)
  const [feedIdCounter, setFeedIdCounter] = useState(seedFeed.length + 1)

  /* Messages */
  const [messages] = useState<Message[]>(seedMessages)

  /* ── Show login screen until authenticated (after all hooks) ── */
  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />

  /* ── Story handlers ── */
  function openAddStory() {
    setStoryModal({ id: -1, ...blankStory() })
    setStoryDraft(blankStory())
  }
  function openEditStory(s: Story) {
    setStoryModal(s)
    setStoryDraft({ title: s.title, category: s.category, excerpt: s.excerpt, link: s.link, image: s.image })
  }
  function saveStory() {
    if (!storyDraft || !storyModal) return
    if (storyModal.id === -1) {
      setStories((prev) => [...prev, { id: storyIdCounter, ...storyDraft }])
      setStoryIdCounter((n) => n + 1)
    } else {
      setStories((prev) => prev.map((s) => (s.id === storyModal.id ? { ...storyModal, ...storyDraft } : s)))
    }
    setStoryModal(null)
    setStoryDraft(null)
  }
  function deleteStory(id: number) {
    setStories((prev) => prev.filter((s) => s.id !== id))
  }

  /* ── Feed handlers ── */
  function openAddFeed() {
    setFeedModal({ id: -1, ...blankFeed() })
    setFeedDraft(blankFeed())
  }
  function openEditFeed(f: FeedItem) {
    setFeedModal(f)
    setFeedDraft({ title: f.title, meta: f.meta, text: f.text, })
  }
  function saveFeed() {
    if (!feedDraft || !feedModal) return
    if (feedModal.id === -1) {
      setFeed((prev) => [...prev, { id: feedIdCounter, ...feedDraft }])
      setFeedIdCounter((n) => n + 1)
    } else {
      setFeed((prev) => prev.map((f) => (f.id === feedModal.id ? { ...feedModal, ...feedDraft } : f)))
    }
    setFeedModal(null)
    setFeedDraft(null)
  }
  function deleteFeed(id: number) {
    setFeed((prev) => prev.filter((f) => f.id !== id))
  }

  const unreadCount = messages.filter((m) => m.unread).length

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
            onClick={() => setAuthed(false)}
            title="Sign out"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className={styles.body}>
        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarLabel}>Manage</div>
          {(
            [
              { key: "stories", label: "Top Stories", icon: "📰" },
              { key: "feed", label: "Live Feed", icon: "⚡" },
              { key: "messages", label: `Messages${unreadCount > 0 ? ` (${unreadCount})` : ""}`, icon: "✉️" },
            ] as { key: Tab; label: string; icon: string }[]
          ).map(({ key, label, icon }) => (
            <button
              key={key}
              className={`${styles.sidebarItem} ${tab === key ? styles.sidebarItemActive : ""}`}
              onClick={() => setTab(key)}
            >
              <span>{icon}</span> {label}
            </button>
          ))}
        </aside>

        {/* ── Main content ── */}
        <main className={styles.main}>

          {/* ── TOP STORIES panel ── */}
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
                <button className={styles.addBtn} onClick={openAddStory}>+ Add Story</button>
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
                      <tr key={s.id} className={styles.trAnim}>
                        <td className={styles.td} style={{ maxWidth: 240 }}>{s.title}</td>
                        <td className={styles.td}>
                          <span className={styles.categoryBadge}>{s.category}</span>
                        </td>
                        <td className={`${styles.td} ${styles.tdMuted}`} style={{ maxWidth: 200 }}>{s.excerpt}</td>
                        <td className={styles.td}>
                          <div className={styles.rowActions}>
                            <button className={styles.iconBtn} onClick={() => openEditStory(s)} title="Edit">✏️</button>
                            <button className={styles.dangerBtn} onClick={() => deleteStory(s.id)} title="Delete">🗑</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {/* ── LIVE FEED panel ── */}
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
                <button className={styles.addBtn} onClick={openAddFeed}>+ Add Signal</button>
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
                      <tr key={f.id} className={styles.trAnim}>
                        <td className={styles.td} style={{ maxWidth: 220 }}>{f.title}</td>
                        <td className={`${styles.td} ${styles.tdMuted}`} style={{ whiteSpace: "nowrap" }}>{f.meta}</td>
                        <td className={`${styles.td} ${styles.tdMuted}`} style={{ maxWidth: 200 }}>{f.text}</td>
                        <td className={styles.td}>
                          <div className={styles.rowActions}>
                            <button className={styles.iconBtn} onClick={() => openEditFeed(f)} title="Edit">✏️</button>
                            <button className={styles.dangerBtn} onClick={() => deleteFeed(f.id)} title="Delete">🗑</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {/* ── MESSAGES panel ── */}
          {tab === "messages" && (
            <>
              <div className={styles.statsRow}>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>{messages.length}</div>
                  <div className={styles.statLabel}>Total</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>{unreadCount}</div>
                  <div className={styles.statLabel}>Unread</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statNum}>{messages.length - unreadCount}</div>
                  <div className={styles.statLabel}>Read</div>
                </div>
              </div>

              <div className={styles.panelHeader}>
                <h1 className={styles.panelTitle}>Messages</h1>
              </div>

              <div className={styles.msgGrid}>
                {messages.map((msg) => (
                  <div key={msg.id} className={styles.msgCard}>
                    <span className={styles.msgName}>
                      {msg.unread && <span className={styles.unreadDot} style={{ display: "inline-block", marginRight: 6 }} />}
                      {msg.name}
                    </span>
                    <span className={styles.msgTime}>{msg.time}</span>
                    <span className={styles.msgSubject}>{msg.subject}</span>
                    <p className={styles.msgPreview}>{msg.preview}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>

      {/* ── Story modal ── */}
      {storyModal && storyDraft && (
        <div className={styles.overlay} onClick={() => { setStoryModal(null); setStoryDraft(null) }}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>{storyModal.id === -1 ? "Add Story" : "Edit Story"}</h2>
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
            <h2 className={styles.modalTitle}>{feedModal.id === -1 ? "Add Signal" : "Edit Signal"}</h2>
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
