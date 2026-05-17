import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_jwt_key_change_me"

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid authorization header" })
  }

  const token = authHeader.split(" ")[1]
  if (!token) {
    return res.status(401).json({ error: "No token provided" })
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.admin = payload
    next()
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" })
  }
}
