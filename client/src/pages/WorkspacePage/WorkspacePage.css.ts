import { keyframes, style } from "@vanilla-extract/css"
import { tokens } from "../../styles/tokens.css"

const fadeIn = keyframes({
  "0%": { opacity: 0, transform: "translateY(8px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
})

export const root = style({
  minHeight: "100vh",
  background: tokens.paper,
  color: tokens.ink,
  fontFamily: '"Space Grotesk", Inter, system-ui, sans-serif',
  display: "flex",
  flexDirection: "column",
})

export const topbar = style({
  height: 64,
  padding: "0 28px",
  borderBottom: `1px solid ${tokens.line}`,
  background: "rgba(255,255,255,0.88)",
  backdropFilter: "blur(16px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "sticky",
  top: 0,
  zIndex: 10,
})

export const topbarBrand = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
})

export const brandName = style({
  fontWeight: 800,
  fontSize: 18,
  color: tokens.ink,
  textDecoration: "none",
})

export const userBadge = style({
  background: tokens.lime,
  color: tokens.ink,
  fontWeight: 800,
  fontSize: 10,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  padding: "3px 9px",
  borderRadius: 4,
})

export const topbarRight = style({
  display: "flex",
  alignItems: "center",
  gap: 16,
})

export const backLink = style({
  fontSize: 14,
  color: tokens.muted,
  textDecoration: "none",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  gap: 6,
  transition: "color 0.15s",
  selectors: { "&:hover": { color: tokens.ink } },
})

export const body = style({
  flex: 1,
  display: "flex",
  minHeight: 0,
})

/* ─── Sidebar ─────────────────────────────────────────────── */
export const sidebar = style({
  width: 240,
  flexShrink: 0,
  borderRight: `1px solid ${tokens.line}`,
  background: tokens.surface,
  padding: "28px 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  "@media": { "(max-width: 760px)": { display: "none" } },
})

export const mobileNav = style({
  display: "none",
  "@media": {
    "(max-width: 760px)": {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 0,
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 20,
      background: "rgba(255,255,255,0.96)",
      backdropFilter: "blur(16px)",
      borderTop: `1px solid ${tokens.line}`,
      padding: "8px 8px calc(8px + env(safe-area-inset-bottom))",
    },
  },
})

export const mobileNavItem = style({
  display: "none",
  "@media": {
    "(max-width: 760px)": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      minHeight: 60,
      border: "none",
      background: "none",
      color: tokens.muted,
      fontSize: 11,
      fontWeight: 700,
      borderRadius: 10,
      cursor: "pointer",
      textAlign: "center",
    },
  },
})

export const mobileNavItemActive = style({
  "@media": {
    "(max-width: 760px)": {
      color: tokens.ink,
      background: tokens.paper,
    },
  },
})

export const mobileNavIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 18,
  height: 18,
})

export const sidebarUpper = style({
  display: "flex",
  flexDirection: "column",
})

export const sidebarLabel = style({
  padding: "0 20px 8px",
  fontSize: 10,
  fontWeight: 800,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: tokens.muted,
})

export const sidebarItem = style({
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "12px 20px",
  fontSize: 15,
  fontWeight: 600,
  color: tokens.muted,
  cursor: "pointer",
  border: "none",
  background: "none",
  width: "100%",
  textAlign: "left",
  borderRadius: 0,
  transition: "background 0.14s, color 0.14s",
  selectors: { "&:hover": { background: tokens.paper, color: tokens.ink } },
})

export const sidebarItemActive = style({
  background: tokens.paper,
  color: tokens.ink,
  fontWeight: 800,
  borderLeft: `4px solid ${tokens.lime}`,
})

export const sidebarProfile = style({
  padding: "16px 20px",
  borderTop: `1px solid ${tokens.line}`,
  display: "flex",
  alignItems: "center",
  gap: 10,
})

export const sidebarProfileName = style({
  fontWeight: 800,
  fontSize: 14,
})

export const sidebarProfileEmail = style({
  fontSize: 11,
  color: tokens.muted,
})

/* ─── Main Content Area ───────────────────────────────────── */
export const main = style({
  flex: 1,
  padding: "36px 40px",
  overflowY: "auto",
  "@media": { "(max-width: 760px)": { padding: "24px 16px 104px" } },
})

export const panelHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 28,
  flexWrap: "wrap",
  gap: 12,
})

export const panelTitle = style({
  margin: 0,
  fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
  fontWeight: 800,
  fontFamily: '"Space Grotesk", sans-serif',
})

/* ─── Timeline / Milestones ───────────────────────────────── */
export const progressTimeline = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  background: tokens.surface,
  padding: 28,
  borderRadius: 12,
  border: `1px solid ${tokens.line}`,
  marginBottom: 32,
  animation: `${fadeIn} 0.25s ease both`,
})

export const progressHeader = style({
  fontSize: 18,
  fontWeight: 800,
  marginBottom: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
})

export const timelineGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 16,
  "@media": { "(max-width: 680px)": { gridTemplateColumns: "1fr" } },
})

export const timelineNode = style({
  border: `1px solid ${tokens.line}`,
  borderRadius: 8,
  padding: 16,
  background: tokens.paper,
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: 6,
  transition: "border-color 0.15s, background 0.15s",
})

export const timelineNodeActive = style({
  borderColor: tokens.ink,
  background: tokens.surface,
  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
  selectors: {
    "&::before": {
      content: "",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 4,
      background: tokens.lime,
      borderRadius: "4px 4px 0 0",
    },
  },
})

export const timelineNodeComplete = style({
  borderColor: tokens.line,
  background: "rgba(184, 255, 56, 0.1)",
})

export const nodeNum = style({
  fontSize: 11,
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: tokens.muted,
})

export const nodeTitle = style({
  fontWeight: 800,
  fontSize: 15,
})

export const nodeDesc = style({
  fontSize: 13,
  color: tokens.muted,
  lineHeight: 1.4,
})

export const nodeStatus = style({
  fontSize: 10,
  fontWeight: 800,
  textTransform: "uppercase",
  padding: "2px 6px",
  borderRadius: 4,
  alignSelf: "start",
  marginTop: 4,
})

/* ─── Brief summary card ─── */
export const card = style({
  background: tokens.surface,
  padding: 28,
  borderRadius: 12,
  border: `1px solid ${tokens.line}`,
  marginBottom: 28,
  animation: `${fadeIn} 0.28s ease both`,
})

export const cardTitle = style({
  fontSize: 18,
  fontWeight: 800,
  margin: "0 0 16px",
  borderBottom: `1px solid ${tokens.line}`,
  paddingBottom: 12,
})

export const detailsGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 20,
  "@media": { "(max-width: 600px)": { gridTemplateColumns: "1fr" } },
})

export const detailGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
})

export const detailLabel = style({
  fontSize: 11,
  fontWeight: 800,
  textTransform: "uppercase",
  color: tokens.muted,
  letterSpacing: "0.08em",
})

export const detailValue = style({
  fontWeight: 600,
  fontSize: 15,
})

export const detailDesc = style({
  fontSize: 14,
  lineHeight: 1.5,
  color: tokens.ink,
})

/* ─── Services Shopping Selector ─── */
export const servicesGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 20,
  animation: `${fadeIn} 0.24s ease both`,
  "@media": { "(max-width: 800px)": { gridTemplateColumns: "1fr" } },
})

export const serviceCard = style({
  background: tokens.surface,
  border: `1px solid ${tokens.line}`,
  borderRadius: 12,
  padding: 24,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 16,
  transition: "border-color 0.15s, transform 0.15s",
  ":hover": {
    borderColor: tokens.ink,
    transform: "translateY(-2px)",
  },
})

export const serviceCardHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: 6,
})

export const serviceName = style({
  fontSize: 18,
  fontWeight: 800,
  margin: 0,
})

export const serviceDesc = style({
  fontSize: 13,
  color: tokens.muted,
  lineHeight: 1.5,
})

export const servicePriceTag = style({
  display: "flex",
  alignItems: "baseline",
  gap: 4,
  marginTop: 10,
})

export const priceAmount = style({
  fontSize: 26,
  fontWeight: 900,
})

export const pricePeriod = style({
  fontSize: 12,
  color: tokens.muted,
  fontWeight: 600,
})

export const serviceStatusBadge = style({
  alignSelf: "start",
  fontSize: 10,
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  padding: "3px 8px",
  borderRadius: 4,
})

export const selectBtn = style({
  height: 42,
  borderRadius: 21,
  background: tokens.ink,
  color: "#fff",
  border: "none",
  fontWeight: 800,
  fontSize: 14,
  cursor: "pointer",
  transition: "opacity 0.15s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  ":hover": {
    opacity: 0.85,
  },
})

export const selectBtnMuted = style([
  selectBtn,
  {
    background: tokens.paper,
    color: tokens.muted,
    border: `1px solid ${tokens.line}`,
    cursor: "default",
    ":hover": {
      opacity: 1,
    },
  },
])

/* ─── Chat Messenger UI ─── */
export const chatContainer = style({
  display: "flex",
  flexDirection: "column",
  height: "calc(100vh - 180px)",
  background: tokens.surface,
  borderRadius: 12,
  border: `1px solid ${tokens.line}`,
  overflow: "hidden",
  animation: `${fadeIn} 0.22s ease both`,
})

export const chatHeader = style({
  padding: "16px 20px",
  borderBottom: `1px solid ${tokens.line}`,
  background: tokens.paper,
  display: "flex",
  alignItems: "center",
  gap: 10,
})

export const chatHeaderInfo = style({
  display: "flex",
  flexDirection: "column",
})

export const chatTitle = style({
  fontWeight: 800,
  fontSize: 15,
})

export const chatSub = style({
  fontSize: 11,
  color: tokens.muted,
  fontWeight: 600,
})

export const chatMessages = style({
  flex: 1,
  padding: 20,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 14,
})

export const bubbleLeft = style({
  alignSelf: "flex-start",
  maxWidth: "70%",
  padding: "12px 16px",
  borderRadius: "16px 16px 16px 4px",
  background: tokens.paper,
  color: tokens.ink,
  lineHeight: 1.5,
  fontSize: 14.5,
  boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
})

export const bubbleRight = style({
  alignSelf: "flex-end",
  maxWidth: "70%",
  padding: "12px 16px",
  borderRadius: "16px 16px 4px 16px",
  background: tokens.ink,
  color: "#fff",
  lineHeight: 1.5,
  fontSize: 14.5,
  boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
})

export const chatTime = style({
  fontSize: 9,
  color: "rgba(255,255,255,0.6)",
  display: "block",
  textAlign: "right",
  marginTop: 4,
})

export const chatTimeLeft = style([
  chatTime,
  {
    color: tokens.muted,
  },
])

export const chatInputRow = style({
  padding: 16,
  borderTop: `1px solid ${tokens.line}`,
  display: "flex",
  gap: 10,
})

export const chatInput = style({
  flex: 1,
  height: 44,
  padding: "0 16px",
  border: `1px solid ${tokens.line}`,
  borderRadius: 22,
  outline: "none",
  background: tokens.paper,
  fontSize: 14,
  transition: "border-color 0.15s",
  ":focus": {
    borderColor: tokens.ink,
  },
})

export const chatSendBtn = style({
  width: 44,
  height: 44,
  borderRadius: "50%",
  background: tokens.ink,
  color: "#fff",
  border: "none",
  cursor: "pointer",
  display: "grid",
  placeItems: "center",
  transition: "opacity 0.15s",
  ":hover": {
    opacity: 0.85,
  },
})

/* ─── Payments Ledger ─── */
export const statsRow = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 16,
  marginBottom: 28,
  "@media": { "(max-width: 600px)": { gridTemplateColumns: "1fr" } },
})

export const statCard = style({
  border: `1px solid ${tokens.line}`,
  borderRadius: 8,
  background: tokens.surface,
  padding: "20px 22px",
})

export const statNum = style({
  fontSize: 32,
  fontWeight: 900,
  lineHeight: 1,
  marginBottom: 6,
})

export const statLabel = style({
  fontSize: 12,
  color: tokens.muted,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
})

export const ledgerTable = style({
  width: "100%",
  borderCollapse: "collapse",
  border: `1px solid ${tokens.line}`,
  borderRadius: 8,
  overflow: "hidden",
  background: tokens.surface,
  fontSize: 14,
  animation: `${fadeIn} 0.22s ease both`,
})

export const thead = style({
  background: tokens.paper,
})

export const th = style({
  padding: "12px 16px",
  textAlign: "left",
  fontWeight: 800,
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: tokens.muted,
  borderBottom: `1px solid ${tokens.line}`,
})

export const td = style({
  padding: "14px 16px",
  borderBottom: `1px solid ${tokens.line}`,
  verticalAlign: "middle",
})

export const tdBold = style([
  td,
  {
    fontWeight: 700,
  },
])

export const emptyState = style({
  padding: "48px 0",
  textAlign: "center",
  color: tokens.muted,
  fontSize: 15,
})

export const paymentActionsCard = style({
  background: tokens.surface,
  border: `1px solid ${tokens.line}`,
  borderRadius: 12,
  padding: 24,
  marginBottom: 24,
})

export const paymentActionsHeader = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 16,
  marginBottom: 18,
  flexWrap: "wrap",
})

export const paymentActionsHeaderRight = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
  justifyContent: "flex-end",
})

export const paymentActionsLabel = style({
  fontSize: 10,
  fontWeight: 800,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: tokens.muted,
  marginBottom: 6,
})

export const paymentActionsTitle = style({
  fontSize: 18,
  fontWeight: 800,
  margin: 0,
})

export const paymentActionsSummary = style({
  fontSize: 24,
  fontWeight: 900,
  color: tokens.ink,
})

export const paymentActionsList = style({
  display: "flex",
  flexDirection: "column",
  gap: 12,
})

export const paymentActionItem = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  padding: 16,
  border: `1px solid ${tokens.line}`,
  borderRadius: 10,
  background: tokens.paper,
  flexWrap: "wrap",
})

export const paymentActionName = style({
  fontSize: 15,
  fontWeight: 800,
  marginBottom: 4,
})

export const paymentActionMeta = style({
  fontSize: 12,
  color: tokens.muted,
  fontWeight: 600,
})

export const loginOverlay = style({
  position: "fixed",
  inset: 0,
  background: "rgba(21,21,21,0.5)",
  backdropFilter: "blur(4px)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
})

export const loginModal = style({
  background: tokens.surface,
  border: `1px solid ${tokens.line}`,
  borderRadius: 16,
  padding: "36px 32px",
  width: "100%",
  maxWidth: 440,
  boxShadow: "0 12px 36px rgba(0,0,0,0.18)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
})

export const loginSubmitBtn = style({
  width: "100%",
  height: 46,
  background: tokens.ink,
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontWeight: 800,
  fontSize: 14,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  transition: "opacity 0.15s",
  ":hover": {
    opacity: 0.9,
  },
})
