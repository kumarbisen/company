import { Router, Request, Response } from "express"
import { requireAuth, RequestWithAdmin } from "../middleware/auth"
import {
  getAllMessages,
  getMessageById,
  createMessage,
  markMessageRead,
  deleteMessage,
} from "../data/db"

const router = Router()

// Public route to submit a new message from the contact form
router.post("/", (req: Request, res: Response) => {
  const newItem = createMessage(req.body)
  res.status(201).json(newItem)
})

// Protected routes for the admin dashboard
router.get("/", requireAuth, (req: RequestWithAdmin, res: Response) => {
  res.json(getAllMessages())
})

router.get("/:id", requireAuth, (req: RequestWithAdmin, res: Response) => {
  const item = getMessageById(req.params.id)
  if (!item) return res.status(404).json({ error: "Not found" })
  res.json(item)
})

router.patch("/:id/read", requireAuth, (req: RequestWithAdmin, res: Response) => {
  const updated = markMessageRead(req.params.id)
  if (!updated) return res.status(404).json({ error: "Not found" })
  res.json(updated)
})

router.delete("/:id", requireAuth, (req: RequestWithAdmin, res: Response) => {
  const deleted = deleteMessage(req.params.id)
  if (!deleted) return res.status(404).json({ error: "Not found" })
  res.json({ success: true })
})

export default router
