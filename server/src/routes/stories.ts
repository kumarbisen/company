import { Router, Request, Response } from "express"
import { requireAuth, RequestWithAdmin } from "../middleware/auth"
import Story from "../models/story"

const router = Router()

const seedStories = [
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

// Get all stories
router.get("/", async (req: Request, res: Response) => {
  try {
    let items = await Story.find()
    if (items.length === 0) {
      await Story.insertMany(seedStories)
      items = await Story.find()
    }
    res.json(items)
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch stories", details: err.message })
  }
})

// Get single story by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const item = await Story.findById(req.params.id)
    if (!item) return res.status(404).json({ error: "Not found" })
    res.json(item)
  } catch (err: any) {
    res.status(500).json({ error: "Error fetching story", details: err.message })
  }
})

// Create story
router.post("/", requireAuth, async (req: RequestWithAdmin, res: Response) => {
  try {
    const newItem = new Story(req.body)
    await newItem.save()
    res.status(201).json(newItem)
  } catch (err: any) {
    res.status(500).json({ error: "Failed to create story", details: err.message })
  }
})

// Update story
router.put("/:id", requireAuth, async (req: RequestWithAdmin, res: Response) => {
  try {
    const updated = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ error: "Not found" })
    res.json(updated)
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update story", details: err.message })
  }
})

// Delete story
router.delete("/:id", requireAuth, async (req: RequestWithAdmin, res: Response) => {
  try {
    const deleted = await Story.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: "Not found" })
    res.json({ success: true })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to delete story", details: err.message })
  }
})

export default router
