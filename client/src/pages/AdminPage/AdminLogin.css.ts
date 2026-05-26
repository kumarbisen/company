import { keyframes, style } from "@vanilla-extract/css"
import { tokens } from "../../styles/tokens.css"

const fadeIn = keyframes({
  "0%": { opacity: 0, transform: "translateY(14px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
})

/* ─── Full-page login wrapper ─────────────────────────────── */
export const loginPage = style({
  minHeight: "100vh",
  background: tokens.paper,
  color: tokens.ink,
  fontFamily: '"Space Grotesk", Inter, system-ui, sans-serif',
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "32px 16px",
  position: "relative",
  overflow: "hidden",
})

/* decorative lime glow behind the card */
export const loginGlow = style({
  position: "absolute",
  top: "-12%",
  right: "-8%",
  width: "50vw",
  height: "50vw",
  borderRadius: "50%",
  background: `radial-gradient(circle, rgba(184,255,56,0.55) 0%, rgba(184,255,56,0.18) 40%, rgba(246,243,238,0) 70%)`,
  filter: "blur(24px)",
  pointerEvents: "none",
  zIndex: 0,
})

export const loginCard = style({
  position: "relative",
  zIndex: 1,
  width: "100%",
  maxWidth: 440,
  background: tokens.surface,
  border: `1px solid ${tokens.line}`,
  borderRadius: 16,
  padding: "40px 36px 36px",
  boxShadow: "0 2px 0 rgba(0,0,0,0.02), 0 20px 60px rgba(0,0,0,0.07)",
  animation: `${fadeIn} 0.3s ease both`,
  "@media": { "(max-width: 480px)": { padding: "32px 22px 28px" } },
})

/* ─── Header inside card ──────────────────────────────────── */
export const loginTop = style({
  marginBottom: 32,
})

export const loginBrandRow = style({
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 20,
})

export const loginBrand = style({
  fontWeight: 800,
  fontSize: 18,
  color: tokens.ink,
  textDecoration: "none",
})

export const loginBadge = style({
  background: tokens.lime,
  color: tokens.ink,
  fontWeight: 800,
  fontSize: 10,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  padding: "3px 9px",
  borderRadius: 4,
})

export const loginTitle = style({
  margin: "0 0 6px",
  fontSize: "clamp(1.6rem, 4vw, 2rem)",
  fontWeight: 800,
  lineHeight: 1.1,
})

export const loginSubtitle = style({
  margin: 0,
  fontSize: 14,
  color: tokens.muted,
  lineHeight: 1.5,
})

/* ─── Form ────────────────────────────────────────────────── */
export const loginForm = style({
  display: "flex",
  flexDirection: "column",
  gap: 18,
})

export const fieldLabel = style({
  display: "flex",
  flexDirection: "column",
  gap: 7,
  fontWeight: 700,
  fontSize: 13,
  color: tokens.ink,
})

export const fieldInput = style({
  height: 44,
  padding: "0 14px",
  border: `1px solid ${tokens.line}`,
  borderRadius: 8,
  background: tokens.paper,
  color: tokens.ink,
  fontSize: 15,
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.15s, box-shadow 0.15s",
  selectors: {
    "&:focus": {
      borderColor: tokens.ink,
      boxShadow: `0 0 0 3px rgba(21,21,21,0.08)`,
    },
  },
})

export const fieldInputError = style({
  borderColor: "#dc2626",
  selectors: {
    "&:focus": {
      borderColor: "#dc2626",
      boxShadow: `0 0 0 3px rgba(220,38,38,0.1)`,
    },
  },
})

/* password wrapper with show/hide toggle */
export const passwordWrap = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
})

export const passwordInput = style({
  height: 44,
  padding: "0 48px 0 14px",
  border: `1px solid ${tokens.line}`,
  borderRadius: 8,
  background: tokens.paper,
  color: tokens.ink,
  fontSize: 15,
  fontFamily: "inherit",
  outline: "none",
  width: "100%",
  transition: "border-color 0.15s, box-shadow 0.15s",
  selectors: {
    "&:focus": {
      borderColor: tokens.ink,
      boxShadow: `0 0 0 3px rgba(21,21,21,0.08)`,
    },
  },
})

export const passwordInputError = style({
  borderColor: "#dc2626",
  selectors: {
    "&:focus": {
      borderColor: "#dc2626",
      boxShadow: `0 0 0 3px rgba(220,38,38,0.1)`,
    },
  },
})

export const showHideBtn = style({
  position: "absolute",
  right: 12,
  background: "none",
  border: "none",
  cursor: "pointer",
  color: tokens.muted,
  padding: 4,
  fontSize: 14,
  display: "flex",
  alignItems: "center",
  transition: "color 0.14s",
  selectors: { "&:hover": { color: tokens.ink } },
})

/* ─── Error banner ────────────────────────────────────────── */
export const errorBanner = style({
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "11px 14px",
  background: "#fef2f2",
  border: `1px solid #fecaca`,
  borderRadius: 8,
  color: "#dc2626",
  fontSize: 13,
  fontWeight: 600,
  animation: `${fadeIn} 0.2s ease both`,
})

/* ─── Submit button ───────────────────────────────────────── */
export const submitBtn = style({
  height: 48,
  background: tokens.ink,
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontWeight: 800,
  fontSize: 15,
  fontFamily: "inherit",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  transition: "opacity 0.15s, transform 0.12s",
  marginTop: 4,
  selectors: {
    "&:hover": { opacity: 0.84 },
    "&:active": { transform: "scale(0.98)" },
    "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
  },
})

export const submitBtnLoading = style({
  opacity: 0.7,
  cursor: "not-allowed",
})

/* ─── Divider hint ────────────────────────────────────────── */
export const hint = style({
  marginTop: 24,
  textAlign: "center",
  fontSize: 13,
  color: tokens.muted,
})

export const hintLink = style({
  color: tokens.ink,
  fontWeight: 700,
  textDecoration: "none",
  borderBottom: `1px solid ${tokens.ink}`,
  paddingBottom: 1,
})

/* ─── Spinner ────────────────────────────────────────────── */
const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
})

export const spinner = style({
  width: 16,
  height: 16,
  border: "2px solid rgba(255,255,255,0.35)",
  borderTop: "2px solid #fff",
  borderRadius: "50%",
  animation: `${spin} 0.7s linear infinite`,
})
