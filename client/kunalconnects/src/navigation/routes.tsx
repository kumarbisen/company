import type { ReactNode } from "react"
import { AdminPage } from "../pages/AdminPage/AdminPage"
import { AgentPage } from "../pages/AgentPage/AgentPage"
import { ChatPage } from "../pages/ChatPage/ChatPage"
import { ClaimPage } from "../pages/ClaimPage/ClaimPage"
import { ExplorePage } from "../pages/ExplorePage/ExplorePage"
import { FaqPage } from "../pages/FaqPage/FaqPage"
import { HomePage } from "../pages/HomePage/HomePage"
import { InvitePage } from "../pages/InvitePage/InvitePage"
import { LegalPage } from "../pages/LegalPage/LegalPage"
import { LiveFeedPage } from "../pages/LiveFeedPage/LiveFeedPage"
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage"
import { ServicesPage } from "../pages/ServicesPage/ServicesPage"
import { AppDevelopmentPage } from "../pages/ServicesPage/AppDevelopmentPage"
import { SocialMediaManagementPage } from "../pages/ServicesPage/SocialMediaManagementPage"
import { MarketingPage } from "../pages/ServicesPage/MarketingPage"
import { WebDevelopmentPage } from "../pages/ServicesPage/WebDevelopmentPage"
import { UnsubscribePage } from "../pages/UnsubscribePage/UnsubscribePage"

type AppRoute = {
  path: string
  element: ReactNode
}

export const routes: AppRoute[] = [
  { path: "/", element: <HomePage /> },
  { path: "/admin", element: <AdminPage /> },
  { path: "/live-feed", element: <LiveFeedPage /> },
  { path: "/chat", element: <ChatPage /> },
  { path: "/explore", element: <ExplorePage /> },
  { path: "/services", element: <ServicesPage /> },
  { path: "/services/app-development", element: <AppDevelopmentPage /> },
  { path: "/services/social-media-management", element: <SocialMediaManagementPage /> },
  { path: "/services/marketing", element: <MarketingPage /> },
  { path: "/services/web-development", element: <WebDevelopmentPage /> },
  { path: "/agent", element: <AgentPage /> },
  { path: "/agent/claim", element: <ClaimPage /> },
  { path: "/invite", element: <InvitePage /> },
  { path: "/terms", element: <LegalPage type="terms" /> },
  { path: "/privacy", element: <LegalPage type="privacy" /> },
  { path: "/faq", element: <FaqPage /> },
  { path: "/unsubscribe", element: <UnsubscribePage /> },
]

export function resolveRoute(pathname: string) {
  return routes.find((route) => route.path === pathname)?.element ?? <NotFoundPage />
}
