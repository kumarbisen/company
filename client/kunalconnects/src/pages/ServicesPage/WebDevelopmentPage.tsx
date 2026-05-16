import { ServiceDetailPage } from "./ServiceDetailPage"

const service = {
  name: "Web Development",
  description: "Build a fast, conversion-ready website with page speed, UX, and launch-ready content that supports every campaign.",
  included: [
    "Landing page and website design",
    "Responsive development and CMS setup",
    "Copy optimization for offers and audiences",
    "Analytics, tracking, and form workflows",
    "Launch review and QA",
  ],
  idealFor: [
    "Businesses that need a better website foundation",
    "Campaigns that require modern landing pages",
    "Teams that want fewer handoffs between design and dev",
  ],
  outcomes: [
    "Improved website experience and conversions",
    "A launch-ready site built for growth",
    "Clear tracking and customer capture workflows",
  ],
}

export function WebDevelopmentPage() {
  return <ServiceDetailPage service={service} />
}
