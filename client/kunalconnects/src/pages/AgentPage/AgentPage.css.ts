import { style } from "@vanilla-extract/css"
import { tokens } from "../../styles/tokens.css"

export const page = style({ minHeight: "calc(100svh - 96px)", maxWidth: 1180, margin: "0 auto", padding: "86px 24px" })
export const form = style({ maxWidth: 740, display: "grid", gap: 14 })
export const label = style({ display: "grid", gap: 8, fontWeight: 800 })
export const labelText = style({ fontWeight: 800 })
export const field = style({ width: "100%", border: `1px solid ${tokens.line}`, borderRadius: 8, padding: 16, background: tokens.surface, color: tokens.ink, font: "inherit" })
export const textarea = style([field, { minHeight: 150, resize: "vertical" }])
export const submit = style({ height: 54, border: 0, borderRadius: 28, background: tokens.ink, color: "#fff", fontWeight: 800 })

export const dropdownWrap = style({
  position: "relative",
})

export const dropdown = style({
  position: "absolute",
  top: "calc(100% + 4px)",
  left: 0,
  right: 0,
  margin: 0,
  padding: 0,
  listStyle: "none",
  background: tokens.surface,
  border: `1px solid ${tokens.line}`,
  borderRadius: 8,
  overflow: "hidden",
  zIndex: 20,
  boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
})

export const dropdownItem = style({
  padding: "12px 16px",
  cursor: "pointer",
  fontWeight: 500,
  transition: "background 0.15s ease",
  ":hover": {
    background: "rgba(255,255,255,0.06)",
  },
})
