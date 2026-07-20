export const navItems = [
  { label: "Services", href: "/services" },
  { label: "Live", href: "/live-feed" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Benefits", href: "/#benefits" },
  { label: "FAQ", href: "/faq" },
]

export const servicePages = [
  {
    name: "App Development",
    slug: "app-development",
    description: "Build product-ready web and mobile experiences with UX, engineering, and a growth-ready launch plan.",
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
  },
  {
    name: "Social Media Management",
    slug: "social-media-management",
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
  },
  {
    name: "Marketing",
    slug: "marketing",
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
  },
  {
    name: "Web Development",
    slug: "web-development",
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
  },
]

export const services = servicePages.map((service) => service.name)

export const benefits = [
  "Strategy, creative, media, and automation in one operating rhythm",
  "Clear weekly visibility into what is working and what needs tuning",
  "Service pods that plug into your team without adding management drag",
  "Systems built for lead quality, not vanity metrics",
]

export const faqs = [
  {
    question: "What is KunalConnects?",
    answer: [
      "KunalConnects is a service partner for companies that want sharper demand generation, better digital presence, and cleaner customer workflows.",
      "The team combines strategy, creative execution, paid growth, websites, and automation into one coordinated growth engine.",
    ],
  },
  {
    question: "Who is it for?",
    answer: [
      "It is built for founders, local businesses, D2C brands, consultants, and service teams that need reliable execution without hiring a large in-house team.",
    ],
  },
  {
    question: "How does matching work?",
    answer: [
      "We map your offer, audience, bottlenecks, and current channels. Then we recommend the service pod that can produce the fastest useful lift.",
    ],
  },
  {
    question: "Do you only handle social media?",
    answer: [
      "No. Social is one layer. KunalConnects can also support websites, landing pages, CRM workflows, paid campaigns, reporting dashboards, and lead nurturing.",
    ],
  },
  {
    question: "How soon can a project start?",
    answer: [
      "Most projects start with a discovery sprint. After scope is locked, the operating board, milestones, and weekly reporting cadence are set up.",
    ],
  },
]

// `feedItems` and `topStories` were moved to backend APIs. Seed data should be added server-side.
