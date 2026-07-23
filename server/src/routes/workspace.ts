import { Router, Response } from "express"
import { requireUserAuth, requireAuth, RequestWithUser, RequestWithAdmin } from "../middleware/auth"
import User from "../models/user"
import Message from "../models/message"
import mongoose from "mongoose"
import { sendNewMessageNotification } from "../utils/mailer"

const router = Router()

/* ─── USER WORKSPACE ROUTES ─── */

// Get current user's workspace profile (including briefs, services, payments)
router.get("/", requireUserAuth, async (req: RequestWithUser, res: Response) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ error: "User not found" })
    res.json(user)
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch workspace", details: err.message })
  }
})

// Submit/Update Brief
router.post("/brief", requireUserAuth, async (req: RequestWithUser, res: Response) => {
  const { companyName, primaryGoal, phone, budget, details, utmSource, utmMedium, utmCampaign } = req.body as {
    companyName: string
    primaryGoal: string
    phone: string
    budget: string
    details: string
    utmSource?: string
    utmMedium?: string
    utmCampaign?: string
  }

  if (!companyName || !primaryGoal || !phone || !budget || !details) {
    return res.status(400).json({ error: "Missing brief fields" })
  }

  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ error: "User not found" })

    user.brief = {
      companyName,
      primaryGoal,
      phone,
      budget,
      details,
      submittedAt: new Date(),
      utmSource,
      utmMedium,
      utmCampaign,
    }

    const alreadyExists = user.services.find((s) => s.name === primaryGoal)
    if (!alreadyExists) {
      user.services.push({
        name: primaryGoal,
        status: "In Discussion",
        price: 0,
        paid: false,
      })
    }

    await user.save()

    await new Message({
      message: `New brief submitted by ${user.name} (${user.email}) for ${companyName}. Goal: ${primaryGoal}`,
      userId: user._id,
      sender: "user",
      isWorkspace: true,
    }).save()

    res.json(user)
  } catch (err: any) {
    res.status(500).json({ error: "Failed to save brief", details: err.message })
  }
})
// Select a new service suite
router.post("/services", requireUserAuth, async (req: RequestWithUser, res: Response) => {
  const { serviceName } = req.body as { serviceName: string }
  if (!serviceName) return res.status(400).json({ error: "Missing serviceName" })

  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ error: "User not found" })

    const alreadyExists = user.services.find((s) => s.name === serviceName)
    if (alreadyExists) {
      return res.status(400).json({ error: "Service is already added to your workspace" })
    }

    user.services.push({
      name: serviceName,
      status: "In Discussion",
      price: 0,
      paid: false,
    })

    await user.save()
    res.json(user)
  } catch (err: any) {
    res.status(500).json({ error: "Failed to add service", details: err.message })
  }
})

// Fetch workspace chat messages between user and admin
router.get("/messages", requireUserAuth, async (req: RequestWithUser, res: Response) => {
  try {
    const chat = await Message.find({
      userId: new mongoose.Types.ObjectId(req.user.id),
      isWorkspace: true,
    }).sort({ createdAt: 1 })
    res.json(chat)
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch chat messages", details: err.message })
  }
})

// Send workspace chat message (User to Admin)
router.post("/messages", requireUserAuth, async (req: RequestWithUser, res: Response) => {
  const { message } = req.body as { message: string }
  if (!message) return res.status(400).json({ error: "Message content required" })

  try {
    const newMsg = new Message({
      message,
      userId: new mongoose.Types.ObjectId(req.user.id),
      sender: "user",
      isWorkspace: true,
    })
    await newMsg.save()

    const user = await User.findById(req.user.id)
    if (user) {
      sendNewMessageNotification(user.name, user.email, message)
    }

    res.status(201).json(newMsg)
  } catch (err: any) {
    res.status(500).json({ error: "Failed to send message", details: err.message })
  }
})


/* ─── ADMIN SIDE WORKSPACE ROUTES ─── */

// Get all active client workspaces (Briefs, selected services, payments)
router.get("/admin/workspaces", requireAuth, async (req: RequestWithAdmin, res: Response) => {
  try {
    const clients = await User.find().sort({ createdAt: -1 })
    res.json(clients)
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch client workspaces", details: err.message })
  }
})

// Get a specific client's workspace
router.get("/admin/workspaces/:userId", requireAuth, async (req: RequestWithAdmin, res: Response) => {
  try {
    const client = await User.findById(req.params.userId)
    if (!client) return res.status(404).json({ error: "Client not found" })
    res.json(client)
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch workspace", details: err.message })
  }
})

// Update client service status & price (Admin to Client)
router.post("/admin/workspaces/:userId/services", requireAuth, async (req: RequestWithAdmin, res: Response) => {
  const { serviceName, status, price, paid } = req.body as {
    serviceName: string
    status?: "In Discussion" | "In Progress" | "Completed" | "Pending Payment"
    price?: number
    paid?: boolean
  }

  if (!serviceName) return res.status(400).json({ error: "serviceName is required" })

  try {
    const client = await User.findById(req.params.userId)
    if (!client) return res.status(404).json({ error: "Client not found" })

    const service = client.services.find((s) => s.name === serviceName)
    if (!service) return res.status(404).json({ error: "Service not found in client's list" })

    if (status !== undefined) service.status = status
    if (price !== undefined) service.price = price
    if (paid !== undefined) service.paid = paid

    await client.save()
    res.json(client)
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update service details", details: err.message })
  }
})

// Get workspace chat messages for a specific client (Admin view)
router.get("/admin/workspaces/:userId/messages", requireAuth, async (req: RequestWithAdmin, res: Response) => {
  try {
    const chat = await Message.find({
      userId: new mongoose.Types.ObjectId(req.params.userId),
      isWorkspace: true,
    }).sort({ createdAt: 1 })
    res.json(chat)
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch chat messages", details: err.message })
  }
})

// Send workspace chat message (Admin to User)
router.post("/admin/workspaces/:userId/messages", requireAuth, async (req: RequestWithAdmin, res: Response) => {
  const { message } = req.body as { message: string }
  if (!message) return res.status(400).json({ error: "Message content required" })

  try {
    const newMsg = new Message({
      message,
      userId: new mongoose.Types.ObjectId(req.params.userId),
      sender: "admin",
      isWorkspace: true,
    })
    await newMsg.save()
    res.status(201).json(newMsg)
  } catch (err: any) {
    res.status(500).json({ error: "Failed to send message", details: err.message })
  }
})

export default router
