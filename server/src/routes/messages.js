import { Router } from "express"
import { requireAuth } from "../middleware/auth.js"
import {
  getAllMessages,
  getMessageById,
  createMessage,
  markMessageRead,
  deleteMessage,
} from "../data/db.js"

const router = Router()

// Public route to submit a new message from the contact form
router.post("/", (req, res) => {
  const newItem = createMessage(req.body)
  res.status(201).json(newItem)
})

// Protected routes for the admin dashboard
router.get("/", requireAuth, (req, res) => {
  res.json(getAllMessages())
})

router.get("/:id", requireAuth, (req, res) => {
  const item = getMessageById(req.params.id)
  if (!item) return res.status(404).json({ error: "Not found" })
  res.json(item)
})

router.patch("/:id/read", requireAuth, (req, res) => {
  const updated = markMessageRead(req.params.id)
  if (!updated) return res.status(404).json({ error: "Not found" })
  res.json(updated)
})

router.delete("/:id", requireAuth, (req, res) => {
  const deleted = deleteMessage(req.params.id)
  if (!deleted) return res.status(404).json({ error: "Not found" })
  res.json({ success: true })
})

export default router
