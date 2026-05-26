import type { ReactNode } from "react"
import { AdminPage } from "../pages/AdminPage/AdminPage"
import { InquiryPage } from "../pages/InquiryPage/InquiryPage"
import { ChatPage } from "../pages/ChatPage/ChatPage"

import { ExplorePage } from "../pages/ExplorePage/ExplorePage"
import { FaqPage } from "../pages/FaqPage/FaqPage"
import { HomePage } from "../pages/HomePage/HomePage"

import { LegalPage } from "../pages/LegalPage/LegalPage"
import { LiveFeedPage } from "../pages/LiveFeedPage/LiveFeedPage"

import { ServicesPage } from "../pages/ServicesPage/ServicesPage"
import { AppDevelopmentPage } from "../pages/ServicesPage/AppDevelopmentPage"
import { SocialMediaManagementPage } from "../pages/ServicesPage/SocialMediaManagementPage"
import { MarketingPage } from "../pages/ServicesPage/MarketingPage"
import { WebDevelopmentPage } from "../pages/ServicesPage/WebDevelopmentPage"

import { WorkspacePage } from "../pages/WorkspacePage/WorkspacePage"

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
  { path: "/agent", element: <InquiryPage /> },
  { path: "/terms", element: <LegalPage type="terms" /> },
  { path: "/privacy", element: <LegalPage type="privacy" /> },
  { path: "/faq", element: <FaqPage /> },
  { path: "/workspace", element: <WorkspacePage /> },
]

export function resolveRoute(pathname: string): ReactNode {
  const match = routes.find((route) => route.path === pathname)
  return match?.element ?? <HomePage />
}

