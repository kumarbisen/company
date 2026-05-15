import { style } from "@vanilla-extract/css"
import { tokens } from "../../styles/tokens.css"

export const page = style({ minHeight: "calc(100svh - 96px)", maxWidth: 1180, margin: "0 auto", padding: "86px 24px" })
export const form = style({ maxWidth: 740, display: "grid", gap: 14 })
export const label = style({ display: "grid", gap: 8, fontWeight: 800 })
export const field = style({ width: "100%", border: `1px solid ${tokens.line}`, borderRadius: 8, padding: 16, background: tokens.surface, color: tokens.ink, font: "inherit" })
export const textarea = style([field, { minHeight: 150, resize: "vertical" }])
export const submit = style({ height: 54, border: 0, borderRadius: 28, background: tokens.ink, color: "#fff", fontWeight: 800 })
