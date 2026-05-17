export const navItems = [
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

export const feedItems = [
  {
    title: "Clinic & salon brand needs automated queue management",
    meta: "Bihar · Growth · 3 month ago",
    text: "High walk-in volume and chaotic scheduling causing customer drop-offs. Needed a robust, custom platform to streamline daily appointments and handle ticketing smoothly.",
    link: "https://bookaly.app",
  },
  {
    title: "High-profile astrologer wants to scale community reach",
    meta: "Mumbai · Automation · 28 min ago",
    text: "Looking to build a consistent personal brand across platforms. Needs high-quality short-form content and active profile management to convert organic views into consultation bookings.",
    link: "https://www.instagram.com/astro_vidya_/",
  },
  {
    title: "Scale-up D2C brand needs social media marketing",
    meta: "Delhi NCR · Creative · 5 days ago",
    text: "Struggling with rising customer demands of achar made with love of dadi hands",
    link: "https://www.instagram.com/dadinanikaachar/",
  },
]

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

export const topStories = [
  {
    title: "Infosys Unveils AI First Value Framework: Uniquely Positioned to Capture New AI Services Opportunity of Over $300 Billion",
    category: "Technology",
    excerpt: "Infosys announces a new value framework built around AI-first delivery, targeting a rapidly expanding global market opportunity.",
    link: "#",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
  },
  {
    title: "How Startups Are Winning with Lean Growth Systems Instead of Big Marketing Teams",
    category: "Growth",
    excerpt: "Founders across sectors are discovering that focused service pods outperform bloated in-house marketing departments.",
    link: "#",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
  },
  {
    title: "CRM Automation Is Now the Single Biggest Lever for D2C Revenue Recovery in 2025",
    category: "Automation",
    excerpt: "New industry data shows that brands with automated follow-up sequences recover 38% more abandoned carts and inquiries.",
    link: "#",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
  },
  {
    title: "Why Performance Creative Is the Most Underinvested Area in Indian Startup Marketing",
    category: "Creative",
    excerpt: "Ad fatigue is real — and the solution isn't bigger budgets, it's faster creative iteration cycles and tighter hook strategies.",
    link: "#",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80",
  },
  {
    title: "From Zero to 50 Qualified Leads a Month: A Mumbai Brand's Systematic Growth Story",
    category: "Case Study",
    excerpt: "A deep-dive into how a premium skincare brand rebuilt their demand engine using content, paid social, and creator operations.",
    link: "#",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
  },
]
