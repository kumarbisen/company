import { style } from "@vanilla-extract/css"
import { tokens } from "../styles/tokens.css"

export const app = style({
  minHeight: "100vh",
  background: tokens.paper,
  color: tokens.ink,
  fontFamily: '"Space Grotesk", Inter, system-ui, sans-serif',
  overflowX: "hidden",
})

export const footer = style({
  minHeight: 86,
  padding: "0 max(24px, calc((100vw - 1180px) / 2))",
  borderTop: `1px solid ${tokens.line}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: tokens.muted,
})

export const footerBrand = style({
  color: tokens.ink,
})

export const footerLinks = style({
  display: "flex",
  gap: 20,
})

export const footerLink = style({
  color: "inherit",
  textDecoration: "none",
})
