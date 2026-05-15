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
    "(max-width: 860px)": {
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
