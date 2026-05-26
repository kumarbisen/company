import { Router, Response } from "express"
import { requireUserAuth, RequestWithUser } from "../middleware/auth"
import User from "../models/user"
import Razorpay from "razorpay"
import crypto from "crypto"

const router = Router()

// Initialize Razorpay client
const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder"
const keySecret = process.env.RAZORPAY_KEY_SECRET || "placeholder_secret"

if (keyId === "rzp_test_placeholder") {
  console.warn("WARNING: RAZORPAY_KEY_ID is not defined in environment variables. Using placeholder.")
}

const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
})

// Create Razorpay Order
router.post("/order", requireUserAuth, async (req: RequestWithUser, res: Response) => {
  const { amount, serviceName } = req.body as { amount: number; serviceName: string }
  if (!amount || !serviceName) {
    return res.status(400).json({ error: "Amount and Service Name are required" })
  }

  try {
    // Razorpay expects amount in paise (1 INR = 100 Paise)
    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `rcpt_${req.user.id.substring(0, 5)}_${Date.now().toString().slice(-6)}`,
      notes: {
        serviceName,
        userId: req.user.id,
      },
    }

    const order = await razorpay.orders.create(options)

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId, // Return key_id to client so client dynamically configures Razorpay Checkout
      notes: order.notes,
    })
  } catch (err: any) {
    console.error("Razorpay order creation error:", err)
    res.status(500).json({ error: "Failed to create order", details: err.message })
  }
})

// Verify Razorpay Payment and update Ledger
router.post("/verify", requireUserAuth, async (req: RequestWithUser, res: Response) => {
  const { paymentId, orderId, signature, serviceName, amount } = req.body as {
    paymentId: string
    orderId: string
    signature: string
    serviceName: string
    amount: number
  }

  if (!paymentId || !orderId || !signature || !serviceName || !amount) {
    return res.status(400).json({ error: "Missing verification details" })
  }

  try {
    // Generate signature using keySecret and check against client signature
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex")

    if (generatedSignature !== signature) {
      return res.status(400).json({ error: "Invalid payment signature verification failed" })
    }

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
    console.error("Razorpay payment verification error:", err)
    res.status(500).json({ error: "Failed to verify payment", details: err.message })
  }
})

export default router

