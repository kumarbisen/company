import { style } from "@vanilla-extract/css"
import { tokens } from "../../styles/tokens.css"

export const page = style({
  minHeight: "calc(100svh - 96px)",
  maxWidth: 1180,
  margin: "0 auto",
  padding: "86px 24px",
  display: "grid",
  gap: 40,
})

export const lead = style({
  maxWidth: 820,
  margin: "24px 0 0",
  color: tokens.muted,
  fontSize: 18,
  lineHeight: 1.8,
})

export const grid = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 32,
  "@media": {
    "(max-width: 860px)": {
      gridTemplateColumns: "1fr",
    },
  },
})

export const section = style({
  padding: 28,
  border: `1px solid ${tokens.line}`,
  borderRadius: 12,
  background: tokens.surface,
})

export const sectionTitle = style({
  margin: "0 0 18px",
  fontSize: 26,
})

export const list = style({
  margin: 0,
  paddingLeft: 24,
  listStyle: "none",
  display: "grid",
  gap: 14,
})

export const item = style({
  position: "relative",
  paddingLeft: 28,
  color: tokens.muted,
  lineHeight: 1.7,
  selectors: {
    "&::before": {
      content: '"•"',
      position: "absolute",
      left: 0,
      top: 2,
      color: tokens.lime,
      fontWeight: 700,
    },
  },
})

export const outcomes = style({
  display: "grid",
  gap: 24,
})

export const ctaSection = style({
  marginTop: 48,
  display: "flex",
  justifyContent: "flex-start",
})

export const flowButton = style({
  height: 56,
  padding: "0 26px 0 28px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 24,
  borderRadius: 30,
  background: tokens.ink,
  color: "#fff",
  fontWeight: 800,
  textDecoration: "none",
})

export const flowIcon = style({
  width: 36,
  height: 36,
  display: "grid",
  placeItems: "center",
  borderRadius: "50%",
  background: tokens.lime,
  color: tokens.ink,
  fontSize: 20,
})
