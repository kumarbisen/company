import { keyframes, style } from "@vanilla-extract/css"
import { tokens } from "../../styles/tokens.css"

const fadeIn = keyframes({
  "0%": { opacity: 0, transform: "translateY(6px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
})

/* ─── Layout ──────────────────────────────────────────────── */
export const root = style({
  minHeight: "100vh",
  background: tokens.paper,
  color: tokens.ink,
  fontFamily: '"Space Grotesk", Inter, system-ui, sans-serif',
  display: "flex",
  flexDirection: "column",
})

export const topbar = style({
  height: 62,
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
})

export const adminBadge = style({
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
  gap: 12,
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
  width: 220,
  flexShrink: 0,
  borderRight: `1px solid ${tokens.line}`,
  background: tokens.surface,
  padding: "28px 0",
  "@media": { "(max-width: 700px)": { display: "none" } },
})

export const mobileNav = style({
  display: "none",
  "@media": {
    "(max-width: 700px)": {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
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
    "(max-width: 700px)": {
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
    "(max-width: 700px)": {
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
  padding: "11px 20px",
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
  borderLeft: `3px solid ${tokens.lime}`,
})

/* ─── Main panel ──────────────────────────────────────────── */
export const main = style({
  flex: 1,
  padding: "36px 40px",
  overflowY: "auto",
  "@media": { "(max-width: 700px)": { padding: "24px 16px 104px" } },
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
  fontSize: "clamp(1.4rem, 3vw, 2rem)",
  fontWeight: 800,
  lineHeight: 1,
})

export const addBtn = style({
  height: 40,
  padding: "0 20px",
  background: tokens.ink,
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontWeight: 800,
  fontSize: 14,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  transition: "opacity 0.15s",
  selectors: { "&:hover": { opacity: 0.82 } },
})

/* ─── Table / Card list ────────────────────────────────────── */
export const table = style({
  width: "100%",
  borderCollapse: "collapse",
  border: `1px solid ${tokens.line}`,
  borderRadius: 8,
  overflow: "hidden",
  background: tokens.surface,
  fontSize: 14,
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
  verticalAlign: "top",
  lineHeight: 1.4,
})

export const trAnim = style({
  animation: `${fadeIn} 0.24s ease both`,
})

export const tdMuted = style({
  color: tokens.muted,
  fontSize: 13,
})

export const categoryBadge = style({
  display: "inline-block",
  background: tokens.lime,
  color: tokens.ink,
  fontWeight: 800,
  fontSize: 10,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  padding: "2px 8px",
  borderRadius: 3,
})

export const rowActions = style({
  display: "flex",
  gap: 8,
})

export const iconBtn = style({
  width: 32,
  height: 32,
  border: `1px solid ${tokens.line}`,
  borderRadius: 6,
  background: "transparent",
  cursor: "pointer",
  display: "grid",
  placeItems: "center",
  fontSize: 14,
  transition: "background 0.14s, border-color 0.14s",
  selectors: {
    "&:hover": { background: tokens.paper, borderColor: tokens.ink },
  },
})

export const dangerBtn = style({
  width: 32,
  height: 32,
  border: `1px solid #fecaca`,
  borderRadius: 6,
  background: "transparent",
  cursor: "pointer",
  display: "grid",
  placeItems: "center",
  fontSize: 14,
  color: "#dc2626",
  transition: "background 0.14s, border-color 0.14s",
  selectors: {
    "&:hover": { background: "#fef2f2", borderColor: "#dc2626" },
  },
})

/* ─── Modal / Drawer ───────────────────────────────────────── */
export const overlay = style({
  position: "fixed",
  inset: 0,
  background: "rgba(21,21,21,0.45)",
  zIndex: 100,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
  animation: `${fadeIn} 0.18s ease both`,
})

export const modal = style({
  background: tokens.surface,
  border: `1px solid ${tokens.line}`,
  borderRadius: 12,
  padding: "32px 28px",
  width: "100%",
  maxWidth: 540,
  maxHeight: "90vh",
  overflowY: "auto",
  animation: `${fadeIn} 0.22s ease both`,
})

export const modalTitle = style({
  margin: "0 0 24px",
  fontSize: 20,
  fontWeight: 800,
})

export const fieldGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  marginBottom: 24,
})

export const label = style({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  fontWeight: 700,
  fontSize: 13,
  color: tokens.ink,
})

export const input = style({
  height: 40,
  padding: "0 12px",
  border: `1px solid ${tokens.line}`,
  borderRadius: 7,
  background: tokens.paper,
  color: tokens.ink,
  fontSize: 14,
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.15s",
  selectors: { "&:focus": { borderColor: tokens.ink } },
})

export const textarea = style({
  padding: "10px 12px",
  border: `1px solid ${tokens.line}`,
  borderRadius: 7,
  background: tokens.paper,
  color: tokens.ink,
  fontSize: 14,
  fontFamily: "inherit",
  outline: "none",
  minHeight: 90,
  resize: "vertical",
  lineHeight: 1.5,
  transition: "border-color 0.15s",
  selectors: { "&:focus": { borderColor: tokens.ink } },
})

export const modalActions = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
})

export const cancelBtn = style({
  height: 40,
  padding: "0 20px",
  background: "transparent",
  border: `1px solid ${tokens.line}`,
  borderRadius: 8,
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
  transition: "background 0.14s",
  selectors: { "&:hover": { background: tokens.paper } },
})

export const saveBtn = style({
  height: 40,
  padding: "0 20px",
  background: tokens.ink,
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontWeight: 800,
  fontSize: 14,
  cursor: "pointer",
  transition: "opacity 0.15s",
  selectors: { "&:hover": { opacity: 0.82 } },
})

/* ─── Messages ─────────────────────────────────────────────── */
export const msgGrid = style({
  display: "flex",
  flexDirection: "column",
  gap: 14,
})

export const msgCard = style({
  border: `1px solid ${tokens.line}`,
  borderRadius: 8,
  background: tokens.surface,
  padding: "18px 20px",
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: "4px 16px",
  alignItems: "start",
  animation: `${fadeIn} 0.22s ease both`,
})

export const msgName = style({
  fontWeight: 800,
  fontSize: 15,
})

export const msgTime = style({
  fontSize: 12,
  color: tokens.muted,
  fontWeight: 600,
  whiteSpace: "nowrap",
})

export const msgSubject = style({
  fontSize: 13,
  color: tokens.muted,
  fontWeight: 600,
  gridColumn: "1 / -1",
})

export const msgPreview = style({
  fontSize: 14,
  color: tokens.ink,
  lineHeight: 1.5,
  gridColumn: "1 / -1",
  marginTop: 4,
})

export const unreadDot = style({
  width: 8,
  height: 8,
  borderRadius: "50%",
  background: tokens.lime,
  border: `2px solid ${tokens.ink}`,
  flexShrink: 0,
  marginTop: 4,
})

export const emptyState = style({
  padding: "48px 0",
  textAlign: "center",
  color: tokens.muted,
  fontSize: 15,
})

/* ─── Stats row ───────────────────────────────────────────── */
export const statsRow = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 16,
  marginBottom: 36,
  "@media": { "(max-width: 600px)": { gridTemplateColumns: "1fr" } },
})

export const statCard = style({
  border: `1px solid ${tokens.line}`,
  borderRadius: 8,
  background: tokens.surface,
  padding: "20px 22px",
})

export const statNum = style({
  fontSize: 36,
  fontWeight: 900,
  lineHeight: 1,
  marginBottom: 6,
})

export const statLabel = style({
  fontSize: 13,
  color: tokens.muted,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
})

/* ─── Client Workspaces & Admin Controls ─── */
export const clientGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
  "@media": { "(max-width: 800px)": { gridTemplateColumns: "1fr" } },
})

export const clientCard = style({
  background: tokens.surface,
  border: `1px solid ${tokens.line}`,
  borderRadius: 8,
  padding: 20,
  cursor: "pointer",
  transition: "border-color 0.15s, transform 0.15s",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 12,
  animation: `${fadeIn} 0.22s ease both`,
  ":hover": {
    borderColor: tokens.ink,
    transform: "translateY(-1px)",
  },
})

export const clientHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
})

export const clientTitle = style({
  fontWeight: 800,
  fontSize: 16,
  margin: 0,
})

export const clientCompany = style({
  fontSize: 13,
  color: tokens.muted,
  fontWeight: 600,
})

export const workspaceContainer = style({
  display: "grid",
  gridTemplateColumns: "1.2fr 1fr",
  gap: 24,
  background: tokens.surface,
  border: `1px solid ${tokens.line}`,
  borderRadius: 12,
  padding: 24,
  animation: `${fadeIn} 0.25s ease both`,
  "@media": { "(max-width: 900px)": { gridTemplateColumns: "1fr" } },
})

export const formRow = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
})

export const serviceCtrlBox = style({
  border: `1px solid ${tokens.line}`,
  borderRadius: 8,
  padding: 16,
  background: tokens.paper,
  marginBottom: 12,
})

export const serviceCtrlHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
  fontWeight: 800,
  fontSize: 14,
})

