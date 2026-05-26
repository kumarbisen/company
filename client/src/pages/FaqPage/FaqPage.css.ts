import { style } from "@vanilla-extract/css"
import { tokens } from "../../styles/tokens.css"

export const page = style({ maxWidth: 760, margin: "0 auto", padding: "72px 24px 96px" })
export const title = style({ fontSize: 34, textTransform: "uppercase", letterSpacing: 0, marginBottom: 42 })
export const list = style({ display: "grid", gap: 42 })
export const item = style({ paddingBottom: 34, borderBottom: `1px solid ${tokens.line}` })
export const question = style({ margin: "0 0 12px", fontSize: 22 })
export const answer = style({ color: tokens.muted, lineHeight: 1.7 })
