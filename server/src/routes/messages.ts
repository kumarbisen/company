import { Router, Request, Response } from "express"
import { requireAuth, RequestWithAdmin } from "../middleware/auth"
import Message from "../models/message"

const router = Router()

const seedMessages = [
  {
    name: "Aryan Kapoor",
    email: "aryan@example.com",
    message: "Hi, I run a D2C skincare brand based in Mumbai. Would love to understand your paid social offering in more detail before we schedule a call.",
    read: false,
    isWorkspace: false,
  },
  {
    name: "Priya Sharma",
    email: "priya@example.com",
    message: "We have about 40 active clients and our follow-up process is completely manual. Looking for a CRM automation system urgently.",
    read: false,
    isWorkspace: false,
  },
  {
    name: "Rahul Nair",
    email: "rahul@example.com",
    message: "I'm a freelance media buyer and I'd love to explore a referral partnership arrangement. Happy to jump on a call this week.",
    read: true,
    isWorkspace: false,
  },
]

// Public route to submit a new message from the contact form
router.post("/", async (req: Request, res: Response) => {
  try {
    const newItem = new Message({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      isWorkspace: false,
    })
    await newItem.save()
    res.status(201).json(newItem)
  } catch (err: any) {
    res.status(500).json({ error: "Failed to submit message", details: err.message })
  }
})

// Protected routes for the admin dashboard (fetches general contact inquiries)
router.get("/", requireAuth, async (req: RequestWithAdmin, res: Response) => {
  try {
    let items = await Message.find({ isWorkspace: false }).sort({ createdAt: -1 })
    if (items.length === 0) {
      await Message.insertMany(seedMessages)
      items = await Message.find({ isWorkspace: false }).sort({ createdAt: -1 })
    }
    res.json(items)
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch messages", details: err.message })
  }
})

// Get single message by ID
router.get("/:id", requireAuth, async (req: RequestWithAdmin, res: Response) => {
  try {
    const item = await Message.findById(req.params.id)
    if (!item) return res.status(404).json({ error: "Not found" })
    res.json(item)
  } catch (err: any) {
    res.status(500).json({ error: "Error fetching message", details: err.message })
  }
})

// Mark message as read
router.patch("/:id/read", requireAuth, async (req: RequestWithAdmin, res: Response) => {
  try {
    const updated = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true })
    if (!updated) return res.status(404).json({ error: "Not found" })
    res.json(updated)
  } catch (err: any) {
    res.status(500).json({ error: "Failed to mark message read", details: err.message })
  }
})

// Delete message
router.delete("/:id", requireAuth, async (req: RequestWithAdmin, res: Response) => {
  try {
    const deleted = await Message.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: "Not found" })
    res.json({ success: true })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to delete message", details: err.message })
  }
})

export default router
