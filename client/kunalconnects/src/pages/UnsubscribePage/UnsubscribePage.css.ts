import { style } from "@vanilla-extract/css"
import { tokens } from "../../styles/tokens.css"

export const page = style({ minHeight: "calc(100svh - 96px)", maxWidth: 1180, margin: "0 auto", padding: "86px 24px" })
export const box = style({ maxWidth: 620, padding: 28, border: `1px solid ${tokens.line}`, borderRadius: 8, background: tokens.surface, display: "grid", gap: 22 })
export const title = style({ margin: 0, fontSize: 38 })
export const text = style({ margin: 0, fontSize: 20, lineHeight: 1.4, color: tokens.muted })
export const button = style({ height: 50, border: 0, borderRadius: 25, background: tokens.ink, color: "#fff", fontWeight: 800 })
