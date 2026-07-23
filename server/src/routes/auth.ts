import { Router, Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { requireAuth, requireUserAuth, RequestWithAdmin, RequestWithUser } from "../middleware/auth"
import User from "../models/user"
import { sendNewUserNotification } from "../utils/mailer"

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_jwt_key_change_me"

// Admin Login
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body as { username?: string; password?: string }
  const validUser = process.env.ADMIN_USERNAME || "admin"
  const validHash = process.env.ADMIN_PASSWORD_HASH || "$2b$10$TewTTWQdeiHNhYgYVYL7MursXqvMId9UMAjqXUpbmelJvoh5Mr09i"

  if (username !== validUser) {
    return res.status(401).json({ error: "Invalid credentials" })
  }

  const isMatch = await bcrypt.compare(password || "", validHash)
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" })
  }

  const token = jwt.sign({ username, role: "admin" }, JWT_SECRET, { expiresIn: "1d" })
  res.json({ token, username })
})

// user login flow
router.post("/gmail-login", async (req: Request, res: Response) => {
  const { email, name, avatar, firebaseUid, providerId, emailVerified } = req.body as {
    email: string
    name: string
    avatar?: string
    firebaseUid?: string
    providerId?: string
    emailVerified?: boolean
  }

  if (!email || !name) {
    return res.status(400).json({ error: "Email and Name are required" })
  }

  try {
    let user = await User.findOne({ email })
    let isNewUser = false

    if (!user) {
      isNewUser = true
      user = new User({
        email,
        name,
        avatar: avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
        firebaseUid,
        providerId,
        emailVerified: emailVerified || false,
      })
    } else {
      user.name = name
      if (avatar) user.avatar = avatar
      if (firebaseUid) user.firebaseUid = firebaseUid
      if (providerId) user.providerId = providerId
      if (typeof emailVerified === "boolean") user.emailVerified = emailVerified
    }

    await user.save()

    if (isNewUser) {
      sendNewUserNotification(user.name, user.email)
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, role: "user" },
      JWT_SECRET,
      { expiresIn: "30d" }
    )

    res.json({ token, user })
  } catch (err: any) {
    res.status(500).json({ error: "Gmail login failed", details: err.message })
  }
})
// Get Admin Profile
router.get("/me", requireAuth, (req: Request, res: Response) => {
  res.json({ user: (req as any).admin })
})

// Get Logged-in User Profile
router.get("/user-me", requireUserAuth, async (req: RequestWithUser, res: Response) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ error: "User not found" })
    res.json(user)
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch user profile", details: err.message })
  }
})

export default router
