import { style } from "@vanilla-extract/css"
import { tokens } from "../../styles/tokens.css"

export const page = style({
  minHeight: "calc(100svh - 96px)",
  maxWidth: 1180,
  margin: "0 auto",
  padding: "86px 24px",
})

export const compact = style({
  maxWidth: 1180,
  margin: "0 auto",
  padding: "96px 24px",
})

export const shell = style({
  border: `1px solid ${tokens.line}`,
  borderRadius: 8,
  background: tokens.surface,
  overflow: "hidden",
})

export const header = style({
  minHeight: 62,
  padding: "0 22px",
  display: "flex",
  alignItems: "center",
  gap: 12,
  borderBottom: `1px solid ${tokens.line}`,
})

export const liveDot = style({
  width: 10,
  height: 10,
  borderRadius: "50%",
  background: tokens.lime,
  boxShadow: `0 0 0 6px rgba(184,255,56,0.24)`,
})

export const updated = style({
  marginLeft: "auto",
  color: tokens.muted,
})

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  "@media": { "(max-width: 860px)": { gridTemplateColumns: "1fr" } },
})

export const card = style({
  minHeight: 260,
  padding: 26,
  borderRight: `1px solid ${tokens.line}`,
})

export const meta = style({ color: tokens.muted, fontWeight: 700 })
export const title = style({ margin: "18px 0 12px", fontSize: 26, lineHeight: 1.05 })
export const text = style({ color: tokens.muted, lineHeight: 1.45 })
export const match = style({ display: "block", marginTop: 28, color: tokens.ink })
