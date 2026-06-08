import "dotenv/config"
import express from "express"
import cors from "cors"
import axios from "axios"
import cheerio from "cheerio"
import { connectDB } from "./config/connect"

import authRoutes from "./routes/auth"
import feedRoutes from "./routes/feed"
import storiesRoutes from "./routes/stories"
import messagesRoutes from "./routes/messages"
import workspaceRoutes from "./routes/workspace"
import paymentsRoutes from "./routes/payments"

const app = express()
const PORT = process.env.PORT || 4000

// Initialize MongoDB Connection
connectDB()

// Middleware
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
  })
)
app.use(express.json())

app.get("/meta", async (req, res) => {
  const url = req.query.url as string | undefined
  if (!url) return res.status(400).json({ error: "missing url" })

  try {
    const resp = await axios.get(url, { timeout: 7000 })
    const html = resp.data
    const $ = cheerio.load(html)
    const title = $("meta[property='og:title']").attr("content") || $("title").text() || null
    const description = $("meta[property='og:description']").attr("content") || $("meta[name='description']").attr("content") || null
    return res.json({ title, description })
  } catch (err: any) {
    return res.status(500).json({ error: "failed to fetch", details: err.message })
  }
})

// API Routes
app.use("/api/auth", authRoutes)
app.use("/api/feed", feedRoutes)
app.use("/api/stories", storiesRoutes)
app.use("/api/messages", messagesRoutes)
app.use("/api/workspace", workspaceRoutes)
app.use("/api/payments", paymentsRoutes)

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" })
})

// Global error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack)
  res.status(500).json({ error: "Internal server error" })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
