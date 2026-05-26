import { ServiceDetailPage } from "./ServiceDetailPage"

const service = {
  name: "Marketing",
  description: "Align your offer, audience, and campaigns with a demand-generation plan that drives leads, conversions, and measurable momentum.",
  included: [
    "Messaging and positioning audit",
    "Campaign strategy for paid and organic channels",
    "Landing pages, funnels, and ad creative",
    "Conversion optimization and retargeting",
    "Weekly monitoring and optimization",
  ],
  idealFor: [
    "Companies that need a cohesive growth plan",
    "Teams with inconsistent lead flow",
    "Brands that want smarter campaign execution",
  ],
  outcomes: [
    "Clearer brand messaging and campaign focus",
    "Predictable lead generation and funnel performance",
    "Optimized spend and better qualified traffic",
  ],
}

export function MarketingPage() {
  return <ServiceDetailPage service={service} />
}
