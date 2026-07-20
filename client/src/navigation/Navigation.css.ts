import { keyframes, style } from "@vanilla-extract/css"
import { tokens } from "../styles/tokens.css"

const slideDown = keyframes({
  "0%": { opacity: 0, transform: "translateY(-8px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
})

/* ─── Header shell ─────────────────────────────────────────── */
export const header = style({
  position: "sticky",
  top: 16,
  zIndex: 20,
  width: "min(1152px, calc(100% - 32px))",
  minHeight: 64,
  margin: "16px auto 0",
  padding: "0 16px 0 62px",
  border: `1px solid ${tokens.line}`,
  borderRadius: 34,
  background: "rgba(255, 255, 255, 0.88)",
  boxShadow: "0 1px 0 rgba(0,0,0,0.03), 0 14px 40px rgba(0,0,0,0.06)",
  backdropFilter: "blur(18px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 24,
  /* on mobile, allow it to grow to wrap the mobile drawer */
  flexWrap: "wrap",
  "@media": {
    "(max-width: 900px)": {
      padding: "0 12px 0 20px",
      borderRadius: 24,
      gap: 0,
    },
  },
})

/* ─── Brand ────────────────────────────────────────────────── */
export const brand = style({
  fontSize: 20,
  fontWeight: 700,
  color: tokens.ink,
  textDecoration: "none",
  whiteSpace: "nowrap",
  /* on mobile, brand takes the left side, toggle the right */
  "@media": {
    "(max-width: 860px)": {
      flex: 1,
      padding: "14px 0",
    },
  },
})

/* ─── Desktop nav (hidden on mobile) ──────────────────────── */
export const nav = style({
  display: "flex",
  gap: 34,
  alignItems: "center",
  color: tokens.muted,
  fontSize: 16,
  fontWeight: 600,
  "@media": {
    "(max-width: 860px)": {
      display: "none",
    },
  },
})

export const navLink = style({
  color: "inherit",
  textDecoration: "none",
  transition: "color 0.15s",
  selectors: {
    "&:hover": { color: tokens.ink },
  },
})

/* ─── Desktop actions (hidden on mobile) ───────────────────── */
export const actions = style({
  display: "flex",
  alignItems: "center",
  gap: 10,
  "@media": {
    "(max-width: 860px)": {
      display: "none",
    },
  },
})

/* ─── Hamburger toggle (only on mobile) ────────────────────── */
export const menuToggle = style({
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  width: 42,
  height: 42,
  borderRadius: 12,
  border: `1px solid ${tokens.line}`,
  background: "transparent",
  cursor: "pointer",
  color: tokens.ink,
  padding: 0,
  transition: "background 0.15s, border-color 0.15s",
  selectors: {
    "&:hover": {
      background: tokens.paper,
    },
  },
  "@media": {
    "(max-width: 860px)": {
      display: "flex",
    },
  },
})

export const iconHamburger = style({ display: "flex", alignItems: "center" })
export const iconClose = style({ display: "flex", alignItems: "center" })

/* ─── Mobile drawer ─────────────────────────────────────────── */
export const mobileMenu = style({
  width: "100%",
  borderTop: `1px solid ${tokens.line}`,
  padding: "18px 4px 20px",
  display: "flex",
  flexDirection: "column",
  gap: 20,
  animation: `${slideDown} 0.22s ease both`,
})

export const mobileNav = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
})

export const mobileNavLink = style({
  color: tokens.muted,
  textDecoration: "none",
  fontWeight: 600,
  fontSize: 17,
  padding: "10px 8px",
  borderRadius: 8,
  transition: "background 0.14s, color 0.14s",
  selectors: {
    "&:hover": {
      background: tokens.paper,
      color: tokens.ink,
    },
  },
})

export const mobileActions = style({
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
})

/* ─── Shared buttons ────────────────────────────────────────── */
export const networkButton = style({
  height: 42,
  padding: "0 18px",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  border: `2px solid ${tokens.ink}`,
  borderRadius: 24,
  background: tokens.lime,
  color: tokens.ink,
  fontWeight: 800,
  textDecoration: "none",
  whiteSpace: "nowrap",
})

export const darkButton = style({
  height: 42,
  padding: "0 22px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 24,
  background: tokens.ink,
  color: "#fff",
  fontWeight: 800,
  textDecoration: "none",
  border: "none",
  whiteSpace: "nowrap",
})

export const outlineButton = style({
  height: 42,
  padding: "0 22px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 24,
  background: "transparent",
  color: tokens.ink,
  fontWeight: 800,
  textDecoration: "none",
  border: `2px solid ${tokens.ink}`,
  whiteSpace: "nowrap",
  cursor: "pointer",
  fontFamily: "inherit",
  fontSize: "inherit",
  transition: "background 0.15s, color 0.15s",
  ":hover": {
    background: tokens.ink,
    color: "#fff",
  },
})

export const chatIcon = style({
  width: 14,
  height: 14,
  border: `2px solid ${tokens.ink}`,
  borderRadius: "50%",
  position: "relative",
  selectors: {
    "&::after": {
      content: "",
      position: "absolute",
      right: -3,
      bottom: -2,
      width: 5,
      height: 5,
      borderLeft: `2px solid ${tokens.ink}`,
      transform: "rotate(-35deg)",
    },
  },
})

/* ─── User Profile & Gmail Login Styles ─── */
export const profilePill = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "4px 14px 4px 4px",
  borderRadius: 20,
  border: `1px solid ${tokens.line}`,
  background: tokens.surface,
  color: tokens.ink,
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
  transition: "border-color 0.15s, background 0.15s",
  ":hover": {
    borderColor: tokens.ink,
    background: tokens.paper,
  },
})

export const avatar = style({
  width: 32,
  height: 32,
  borderRadius: "50%",
  background: tokens.lime,
  color: tokens.ink,
  display: "grid",
  placeItems: "center",
  fontWeight: 800,
  fontSize: 12,
  overflow: "hidden",
})

export const logoutBtn = style({
  background: "none",
  border: "none",
  color: tokens.muted,
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  padding: "4px 8px",
  transition: "color 0.15s",
  ":hover": {
    color: tokens.ink,
  },
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
  animation: `${slideDown} 0.25s ease both`,
})

export const googleLogo = style({
  width: 42,
  height: 42,
  marginBottom: 16,
})

export const loginTitle = style({
  margin: "0 0 8px",
  fontSize: 22,
  fontWeight: 800,
  textAlign: "center",
  fontFamily: '"Space Grotesk", sans-serif',
})

export const loginSubtitle = style({
  margin: "0 0 28px",
  fontSize: 14,
  color: tokens.muted,
  textAlign: "center",
  lineHeight: 1.5,
})

export const mockAccountItem = style({
  width: "100%",
  padding: "12px 16px",
  border: `1px solid ${tokens.line}`,
  borderRadius: 10,
  background: tokens.paper,
  display: "flex",
  alignItems: "center",
  gap: 12,
  cursor: "pointer",
  marginBottom: 10,
  transition: "border-color 0.15s, transform 0.1s",
  textAlign: "left",
  ":hover": {
    borderColor: tokens.ink,
    transform: "translateY(-1px)",
  },
})

export const mockAccountInfo = style({
  display: "flex",
  flexDirection: "column",
  gap: 2,
})

export const mockAccountName = style({
  fontWeight: 700,
  fontSize: 14,
  color: tokens.ink,
})

export const mockAccountEmail = style({
  fontSize: 12,
  color: tokens.muted,
})

export const orDivider = style({
  width: "100%",
  textAlign: "center",
  borderBottom: `1px solid ${tokens.line}`,
  lineHeight: "0.1em",
  margin: "18px 0 20px",
  fontSize: 11,
  color: tokens.muted,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  fontWeight: 700,
})

export const orDividerSpan = style({
  background: tokens.surface,
  padding: "0 10px",
})

export const customLoginForm = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 12,
})

export const loginInput = style({
  width: "100%",
  height: 46,
  padding: "0 14px",
  border: `1px solid ${tokens.line}`,
  borderRadius: 8,
  background: tokens.paper,
  color: tokens.ink,
  fontSize: 14,
  outline: "none",
  transition: "border-color 0.15s",
  ":focus": {
    borderColor: tokens.ink,
  },
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

export const loginCancelBtn = style({
  background: "none",
  border: "none",
  color: tokens.muted,
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  marginTop: 16,
  textDecoration: "underline",
  ":hover": {
    color: tokens.ink,
  },
})

