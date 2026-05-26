import { style } from "@vanilla-extract/css"
import { tokens } from "../../styles/tokens.css"

export const intro = style({
  maxWidth: 850,
  marginBottom: 42,
})

export const kicker = style({
  color: tokens.muted,
  fontWeight: 800,
  textTransform: "uppercase",
})

export const title = style({
  margin: "10px 0 0",
  fontSize: "clamp(2.7rem, 6vw, 6.6rem)",
  lineHeight: 0.95,
  letterSpacing: 0,
})
