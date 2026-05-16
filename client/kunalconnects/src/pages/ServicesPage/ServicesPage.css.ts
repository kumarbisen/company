import { style } from "@vanilla-extract/css"
import { tokens } from "../../styles/tokens.css"

export const page = style({ minHeight: "calc(100svh - 96px)", maxWidth: 1180, margin: "0 auto", padding: "86px 24px" })
export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: 14,
  "@media": { "(max-width: 980px)": { gridTemplateColumns: "repeat(2, 1fr)" }, "(max-width: 560px)": { gridTemplateColumns: "1fr" } },
})
export const card = style({
  minHeight: 220,
  padding: 22,
  border: `1px solid ${tokens.line}`,
  borderRadius: 8,
  background: tokens.surface,
  display: "block",
  textDecoration: "none",
  color: "inherit",
})
export const number = style({ color: tokens.muted, fontWeight: 800 })
export const title = style({ margin: "44px 0 10px", fontSize: 26 })
export const text = style({ margin: 0, color: tokens.muted })
