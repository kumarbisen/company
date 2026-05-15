import { style } from "@vanilla-extract/css"
import { tokens } from "../../styles/tokens.css"

export const page = style({ minHeight: "calc(100svh - 96px)", maxWidth: 1180, margin: "0 auto", padding: "86px 24px" })
export const layout = style({
  display: "grid",
  gridTemplateColumns: "260px 1fr",
  minHeight: 520,
  border: `1px solid ${tokens.line}`,
  borderRadius: 8,
  overflow: "hidden",
  background: tokens.surface,
  "@media": { "(max-width: 760px)": { gridTemplateColumns: "1fr" } },
})
export const threadList = style({ padding: 14, borderRight: `1px solid ${tokens.line}`, display: "grid", alignContent: "start", gap: 8 })
export const threadButton = style({ border: 0, borderRadius: 22, padding: "12px 14px", textAlign: "left", background: tokens.paper, fontWeight: 700 })
export const panel = style({ padding: 26, display: "flex", flexDirection: "column", gap: 18 })
export const messageLeft = style({ maxWidth: 420, padding: 18, borderRadius: 8, background: tokens.paper, margin: 0 })
export const messageRight = style({ alignSelf: "flex-end", maxWidth: 460, padding: 18, borderRadius: 8, background: tokens.ink, color: "#fff", margin: 0 })
export const input = style({ marginTop: "auto", padding: 18, border: `1px solid ${tokens.line}`, borderRadius: 28, color: tokens.muted })
