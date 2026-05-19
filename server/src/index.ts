import "dotenv/config"
import express from "express"
import cors from "cors"

import authRoutes from "./routes/auth"
import feedRoutes from "./routes/feed"
import storiesRoutes from "./routes/stories"
import messagesRoutes from "./routes/messages"

const app = express()
const PORT = process.env.PORT || 4000
const uri = process.env.MONGO_URI 

// Middleware
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS || "http://localhost:5173",
  })
)
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
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack)
  res.status(500).json({ error: "Internal server error" })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
