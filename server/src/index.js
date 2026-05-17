import "dotenv/config"
import express from "express"
import cors from "cors"

import authRoutes from "./routes/auth.js"
import feedRoutes from "./routes/feed.js"
import storiesRoutes from "./routes/stories.js"
import messagesRoutes from "./routes/messages.js"

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS || "http://localhost:5173"
}))
app.use(express.json())

// API Routes
app.use("/api/auth", authRoutes)
app.use("/api/feed", feedRoutes)
app.use("/api/stories", storiesRoutes)
app.use("/api/messages", messagesRoutes)

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Internal server error" })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
