import { ServiceDetailPage } from "./ServiceDetailPage"

const service = {
  name: "App Development",
  description: "Launch product-ready web and mobile experiences with UX, engineering, and a growth-ready release plan.",
  included: [
    "Product vision and feature planning",
    "UX/UI design for web and mobile",
    "Frontend engineering and responsive pages",
    "Backend and API integration",
    "QA, deployment, and launch readiness",
  ],
  idealFor: [
    "Founders launching a new digital product",
    "Businesses that need a modern website or app",
    "Teams that want reliable build delivery without hiring in-house",
  ],
  outcomes: [
    "A polished production app or website",
    "Faster launch with clear milestones",
    "A stable codebase ready for ongoing growth",
  ],
}

export function AppDevelopmentPage() {
  return <ServiceDetailPage service={service} />
}
