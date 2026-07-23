import { keyframes, style } from "@vanilla-extract/css"
import { tokens } from "../../styles/tokens.css"

const marqueeMove = keyframes({
  "0%": { transform: "translateX(0)" },
  "100%": { transform: "translateX(-50%)" },
})

export const hero = style({
  position: "relative",
  minHeight: "calc(100svh - 80px)",
  padding: "78px 24px 36px",
  "@media": {
    "(max-width: 860px)": {
      minHeight: "auto",
      padding: "48px 16px 24px",
    },
  },
  overflow: "hidden",
})

export const glow = style({
  position: "absolute",
  right: "-9%",
  top: "-1%",
  width: "56vw",
  height: "56vw",
  borderRadius: "50%",
  background: `radial-gradient(circle, rgba(184,255,56,0.75) 0%, rgba(184,255,56,0.38) 34%, rgba(246,243,238,0) 68%)`,
  filter: "blur(18px)",
  pointerEvents: "none",
})

export const medal = style({
  width: 21,
  height: 21,
  display: "grid",
  placeItems: "center",
  borderRadius: "50%",
  background: "#f4c400",
  color: "#fff",
  fontSize: 12,
})

export const heroGrid = style({
  position: "relative",
  zIndex: 1,
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(320px, 382px)",
  alignItems: "end",
  gap: 40,
  maxWidth: 1224,
  margin: "56px auto 0",
  "@media": { "(max-width: 900px)": { gridTemplateColumns: "1fr", marginTop: 0 } },
})

export const heroTitle = style({
  margin: 0,
  maxWidth: 760,
  fontSize: "clamp(4.2rem, 9vw, 8.15rem)",
  lineHeight: 0.88,
  letterSpacing: 0,
  fontWeight: 800,
  "@media": { "(max-width: 620px)": { fontSize: "3.8rem" } },
})

export const highlighted = style({
  position: "relative",
  display: "inline-block",
  zIndex: 1,
  selectors: {
    "&::before": {
      content: "",
      position: "absolute",
      left: 0,
      right: "-0.15em",
      bottom: "0.13em",
      height: "0.32em",
      background: tokens.lime,
      zIndex: -1,
    },
  },
})

export const heroCopy = style({
  display: "grid",
  gap: 32,
  paddingBottom: 10,
})

export const heroText = style({
  borderLeft: `2px solid ${tokens.lime}`,
  paddingLeft: 20,
  color: "#282828",
  fontSize: 22,
  lineHeight: 1.3,
  margin: 0,
})

export const flowButton = style({
  height: 56,
  padding: "0 26px 0 28px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 24,
  borderRadius: 30,
  background: tokens.ink,
  color: "#fff",
  fontWeight: 800,
  textDecoration: "none",
})

export const flowIcon = style({
  width: 36,
  height: 36,
  display: "grid",
  placeItems: "center",
  borderRadius: "50%",
  background: tokens.lime,
  color: tokens.ink,
  fontSize: 20,
})

export const marquee = style({
  borderTop: `1px solid ${tokens.line}`,
  borderBottom: `1px solid ${tokens.line}`,
  overflow: "hidden",
  background: tokens.surface,
})

export const marqueeTrack = style({
  width: "max-content",
  display: "flex",
  animation: `${marqueeMove} 36s linear infinite`,
})

export const marqueeItem = style({
  padding: "18px 36px",
  fontSize: 18,
  fontWeight: 800,
  textTransform: "uppercase",
})

export const section = style({
  maxWidth: 1180,
  margin: "0 auto",
  padding: "96px 24px",
})

export const sectionHeader = style({
  maxWidth: 780,
  marginBottom: 44,
})

export const eyebrow = style({
  color: tokens.muted,
  fontWeight: 800,
  textTransform: "uppercase",
})

export const sectionTitle = style({
  margin: "12px 0 0",
  fontSize: "clamp(2.4rem, 5vw, 5.4rem)",
  lineHeight: 0.95,
  letterSpacing: 0,
})

export const steps = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: 16,
  "@media": { "(max-width: 920px)": { gridTemplateColumns: "repeat(2, 1fr)" }, "(max-width: 560px)": { gridTemplateColumns: "1fr" } },
})

export const stepCard = style({
  minHeight: 250,
  padding: 24,
  border: `1px solid ${tokens.line}`,
  borderRadius: 8,
  background: tokens.surface,
})

export const stepNumber = style({ color: tokens.muted, fontWeight: 800 })
export const stepTitle = style({ margin: "58px 0 14px", fontSize: 30 })
export const stepText = style({ margin: 0, color: tokens.muted, lineHeight: 1.5 })

export const splitSection = style({
  display: "grid",
  gridTemplateColumns: "0.9fr 1fr",
  gap: 46,
  padding: "90px max(24px, calc((100vw - 1180px) / 2))",
  background: tokens.ink,
  color: "#fff",
  "@media": { "(max-width: 860px)": { gridTemplateColumns: "1fr" } },
})

export const limeEyebrow = style({
  color: tokens.lime,
  fontWeight: 800,
  textTransform: "uppercase",
})

export const splitTitle = style({
  margin: "12px 0 0",
  fontSize: "clamp(2.4rem, 5vw, 5.4rem)",
  lineHeight: 0.95,
})

export const benefitList = style({
  display: "grid",
  gap: 12,
})

export const benefitItem = style({
  margin: 0,
  padding: "22px 0",
  borderBottom: "1px solid rgba(255,255,255,0.18)",
  fontSize: 22,
  lineHeight: 1.25,
})

export const ctaSection = style({
  padding: "64px 24px",
  display: "flex",
  justifyContent: "center",
  background: tokens.surface,
})
