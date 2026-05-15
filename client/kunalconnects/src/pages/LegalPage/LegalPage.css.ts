import { style } from "@vanilla-extract/css"
import { tokens } from "../../styles/tokens.css"

export const page = style({ maxWidth: 760, margin: "0 auto", padding: "72px 24px 96px" })
export const title = style({ fontSize: 34, textTransform: "uppercase", letterSpacing: 0, marginBottom: 42 })
export const heading = style({ margin: "32px 0 12px", fontSize: 22 })
export const text = style({ color: tokens.muted, lineHeight: 1.7 })
