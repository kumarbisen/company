import { Router } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { requireAuth } from "../middleware/auth.js"

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_jwt_key_change_me"

router.post("/login", async (req, res) => {
  const { username, password } = req.body
  const validUser = process.env.ADMIN_USERNAME || "admin"
  const validHash = process.env.ADMIN_PASSWORD_HASH || "$2b$10$TewTTWQdeiHNhYgYVYL7MursXqvMId9UMAjqXUpbmelJvoh5Mr09i"

  if (username !== validUser) {
    return res.status(401).json({ error: "Invalid credentials" })
  }

  const isMatch = await bcrypt.compare(password, validHash)
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" })
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1d" })
  res.json({ token, username })
})

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.admin })
})

export default router
