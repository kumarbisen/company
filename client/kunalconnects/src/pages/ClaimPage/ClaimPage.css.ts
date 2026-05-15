import { style } from "@vanilla-extract/css"
import { tokens } from "../../styles/tokens.css"

export const page = style({ minHeight: "calc(100svh - 96px)", maxWidth: 1180, margin: "0 auto", padding: "86px 24px" })
export const box = style({ maxWidth: 620, padding: 28, border: `1px solid ${tokens.line}`, borderRadius: 8, background: tokens.surface, display: "grid", gap: 22 })
export const text = style({ margin: 0, fontSize: 20, lineHeight: 1.4, color: tokens.muted })
export const button = style({ height: 56, padding: "0 26px 0 28px", width: "max-content", display: "inline-flex", alignItems: "center", gap: 24, borderRadius: 30, background: tokens.ink, color: "#fff", fontWeight: 800, textDecoration: "none" })
export const icon = style({ width: 36, height: 36, display: "grid", placeItems: "center", borderRadius: "50%", background: tokens.lime, color: tokens.ink, fontSize: 20 })
