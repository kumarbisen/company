import { ServiceDetailPage } from "./ServiceDetailPage"

const service = {
  name: "Social Media Management",
  description: "Turn your brand presence into a consistent publishing engine with content, engagement, and growth measurement.",
  included: [
    "Content calendar and campaign planning",
    "Social media post creation and publishing",
    "Community engagement and inbox management",
    "Performance tracking and weekly reporting",
    "Creative optimization and channel testing",
  ],
  idealFor: [
    "Brands needing regular social content",
    "Founders who want better audience conversion from social",
    "Teams that need consistent quality without more headcount",
  ],
  outcomes: [
    "A reliable publishing rhythm across channels",
    "Clear content ROI and engagement signals",
    "Stronger social audience and lead inflow",
  ],
}

export function SocialMediaManagementPage() {
  return <ServiceDetailPage service={service} />
}
