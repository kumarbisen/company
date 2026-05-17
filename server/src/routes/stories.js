import { Router } from "express"
import { requireAuth } from "../middleware/auth.js"
import {
  getAllStories,
  getStoryById,
  createStory,
  updateStory,
  deleteStory,
} from "../data/db.js"

const router = Router()

router.get("/", (req, res) => {
  res.json(getAllStories())
})

router.get("/:id", (req, res) => {
  const item = getStoryById(req.params.id)
  if (!item) return res.status(404).json({ error: "Not found" })
  res.json(item)
})

router.post("/", requireAuth, (req, res) => {
  const newItem = createStory(req.body)
  res.status(201).json(newItem)
})

router.put("/:id", requireAuth, (req, res) => {
  const updated = updateStory(req.params.id, req.body)
  if (!updated) return res.status(404).json({ error: "Not found" })
  res.json(updated)
})

router.delete("/:id", requireAuth, (req, res) => {
  const deleted = deleteStory(req.params.id)
  if (!deleted) return res.status(404).json({ error: "Not found" })
  res.json({ success: true })
})

export default router
