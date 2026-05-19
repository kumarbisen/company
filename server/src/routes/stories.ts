import { Router, Request, Response } from "express"
import { requireAuth, RequestWithAdmin } from "../middleware/auth"
import {
  getAllStories,
  getStoryById,
  createStory,
  updateStory,
  deleteStory,
} from "../data/db"

const router = Router()

router.get("/", (req: Request, res: Response) => {
  res.json(getAllStories())
})

router.get("/:id", (req: Request, res: Response) => {
  const item = getStoryById(req.params.id)
  if (!item) return res.status(404).json({ error: "Not found" })
  res.json(item)
})

router.post("/", requireAuth, (req: RequestWithAdmin, res: Response) => {
  const newItem = createStory(req.body)
  res.status(201).json(newItem)
})

router.put("/:id", requireAuth, (req: RequestWithAdmin, res: Response) => {
  const updated = updateStory(req.params.id, req.body)
  if (!updated) return res.status(404).json({ error: "Not found" })
  res.json(updated)
})

router.delete("/:id", requireAuth, (req: RequestWithAdmin, res: Response) => {
  const deleted = deleteStory(req.params.id)
  if (!deleted) return res.status(404).json({ error: "Not found" })
  res.json({ success: true })
})

export default router
