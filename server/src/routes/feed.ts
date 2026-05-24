import { Router, Request, Response } from "express"
import { requireAuth, RequestWithAdmin } from "../middleware/auth"
import FeedItem from "../models/feed"

const router = Router()

const seedFeedItems = [
  {
    title: "Clinic & salon brand needs automated queue management",
    meta: "Bihar · Growth · 3 month ago",
    text: "High walk-in volume and chaotic scheduling causing customer drop-offs. Needed a robust, custom platform to streamline daily appointments and handle ticketing smoothly.",
    link: "https://bookaly.app",
  },
  {
    title: "High-profile astrologer wants to scale community reach",
    meta: "Mumbai · Automation · 28 min ago",
    text: "Looking to build a consistent personal brand across platforms. Needs high-quality short-form content and active profile management to convert organic views into consultation bookings.",
    link: "https://www.instagram.com/astro_vidya_/",
  },
  {
    title: "Scale-up D2C brand needs social media marketing",
    meta: "Delhi NCR · Creative · 5 days ago",
    text: "Struggling with rising customer demands of achar made with love of dadi hands",
    link: "https://www.instagram.com/dadinanikaachar/",
  },
]

// Get all feed items
router.get("/", async (req: Request, res: Response) => {
  try {
    let items = await FeedItem.find().sort({ _id: -1 })
    if (items.length === 0) {
      await FeedItem.insertMany(seedFeedItems)
      items = await FeedItem.find().sort({ _id: -1 })
    }
    res.json(items)
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch feed items", details: err.message })
  }
})

// Get single feed item
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const item = await FeedItem.findById(req.params.id)
    if (!item) return res.status(404).json({ error: "Not found" })
    res.json(item)
  } catch (err: any) {
    res.status(500).json({ error: "Error fetching item", details: err.message })
  }
})

// Create feed item
router.post("/", requireAuth, async (req: RequestWithAdmin, res: Response) => {
  try {
    const newItem = new FeedItem(req.body)
    await newItem.save()
    res.status(201).json(newItem)
  } catch (err: any) {
    res.status(500).json({ error: "Failed to create item", details: err.message })
  }
})

// Update feed item
router.put("/:id", requireAuth, async (req: RequestWithAdmin, res: Response) => {
  try {
    const updated = await FeedItem.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ error: "Not found" })
    res.json(updated)
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update item", details: err.message })
  }
})

// Delete feed item
router.delete("/:id", requireAuth, async (req: RequestWithAdmin, res: Response) => {
  try {
    const deleted = await FeedItem.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: "Not found" })
    res.json({ success: true })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to delete item", details: err.message })
  }
})

export default router
