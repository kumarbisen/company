import { style } from "@vanilla-extract/css"
import { tokens } from "../../styles/tokens.css"

export const page = style({ minHeight: "calc(100svh - 96px)", maxWidth: 1180, margin: "0 auto", padding: "86px 24px" })
export const button = style({ height: 42, padding: "0 22px", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 24, background: tokens.ink, color: "#fff", fontWeight: 800, textDecoration: "none" })
