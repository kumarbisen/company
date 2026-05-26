import { keyframes, style } from "@vanilla-extract/css"
import { tokens } from "../../styles/tokens.css"

const fadeSlideIn = keyframes({
  "0%": { opacity: 0, transform: "translateY(12px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
})

export const section = style({
  maxWidth: 1180,
  margin: "0 auto",
  padding: "96px 24px",
})

export const topBar = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 28,
})

export const heading = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 0,
})

export const headingLabel = style({
  background: tokens.ink,
  color: "#fff",
  fontWeight: 900,
  fontSize: 13,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  padding: "6px 12px",
  borderRadius: 4,
})

export const pagination = style({
  display: "flex",
  alignItems: "center",
  gap: 10,
})

export const pageCounter = style({
  fontWeight: 800,
  fontSize: 15,
  background: tokens.ink,
  color: "#fff",
  padding: "5px 14px",
  borderRadius: 4,
  letterSpacing: "0.04em",
  minWidth: 60,
  textAlign: "center",
})

export const navBtn = style({
  width: 40,
  height: 40,
  display: "grid",
  placeItems: "center",
  border: `1px solid ${tokens.line}`,
  borderRadius: 6,
  background: tokens.surface,
  cursor: "pointer",
  fontSize: 18,
  color: tokens.ink,
  transition: "background 0.18s, border-color 0.18s, color 0.18s",
  selectors: {
    "&:hover": {
      background: tokens.ink,
      borderColor: tokens.ink,
      color: "#fff",
    },
    "&:disabled": {
      opacity: 0.35,
      cursor: "not-allowed",
      background: tokens.surface,
      borderColor: tokens.line,
      color: tokens.muted,
    },
  },
})

export const card = style({
  border: `1px solid ${tokens.line}`,
  borderRadius: 10,
  background: tokens.surface,
  overflow: "hidden",
  animation: `${fadeSlideIn} 0.32s ease both`,
})

export const imageWrap = style({
  width: "100%",
  aspectRatio: "16 / 7",
  overflow: "hidden",
  background: "#e8e4de",
})

export const image = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  transition: "transform 0.5s ease",
  selectors: {
    [`${card}:hover &`]: {
      transform: "scale(1.03)",
    },
  },
})

export const imagePlaceholder = style({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(135deg, #e8e4de 0%, #d4cfc8 100%)`,
  color: tokens.muted,
  fontSize: 14,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
})

export const body = style({
  padding: "28px 30px 32px",
})

export const category = style({
  display: "inline-block",
  background: tokens.lime,
  color: tokens.ink,
  fontWeight: 800,
  fontSize: 11,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  padding: "3px 10px",
  borderRadius: 3,
  marginBottom: 18,
})

export const storyTitle = style({
  margin: "0 0 24px",
  fontSize: "clamp(1.55rem, 3vw, 2.4rem)",
  lineHeight: 1.08,
  letterSpacing: "-0.01em",
  fontWeight: 800,
  maxWidth: 860,
})

export const readMore = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  color: tokens.ink,
  fontWeight: 800,
  fontSize: 15,
  textDecoration: "none",
  borderBottom: `2px solid ${tokens.ink}`,
  paddingBottom: 1,
  transition: "gap 0.18s",
  selectors: {
    "&:hover": {
      gap: 10,
    },
  },
})
