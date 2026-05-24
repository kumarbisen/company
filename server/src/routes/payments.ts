import { Router, Response } from "express"
import { requireUserAuth, RequestWithUser } from "../middleware/auth"
import User from "../models/user"

const router = Router()

// Create Razorpay Order (Simulated / Sandbox)
router.post("/order", requireUserAuth, async (req: RequestWithUser, res: Response) => {
  const { amount, serviceName } = req.body as { amount: number; serviceName: string }
  if (!amount || !serviceName) {
    return res.status(400).json({ error: "Amount and Service Name are required" })
  }

  try {
    // Generate a sandbox order ID
    const randomHex = Math.random().toString(36).substring(2, 10).toUpperCase()
    const orderId = `order_${randomHex}`

    res.json({
      id: orderId,
      amount: amount * 100, // Razorpay works in paise
      currency: "INR",
      notes: {
        serviceName,
        userId: req.user.id,
      },
    })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to create order", details: err.message })
  }
})

// Verify Razorpay Payment and update Ledger
router.post("/verify", requireUserAuth, async (req: RequestWithUser, res: Response) => {
  const { paymentId, orderId, serviceName, amount } = req.body as {
    paymentId: string
    orderId: string
    serviceName: string
    amount: number
  }

  if (!paymentId || !orderId || !serviceName || !amount) {
    return res.status(400).json({ error: "Missing verification details" })
  }

  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ error: "User not found" })

    // Find the service and mark it as paid
    const service = user.services.find((s) => s.name === serviceName)
    if (service) {
      service.paid = true
      service.status = "In Progress"
      service.price = amount
    } else {
      // If service is not listed, push it
      user.services.push({
        name: serviceName,
        status: "In Progress",
        price: amount,
        paid: true,
      })
    }

    // Add to payments ledger
    user.payments.push({
      serviceName,
      amount,
      paymentId,
      orderId,
      date: new Date(),
    })

    await user.save()
    res.json({ success: true, user })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to verify payment", details: err.message })
  }
})

export default router
