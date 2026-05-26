"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const user_1 = __importDefault(require("../models/user"));
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const router = (0, express_1.Router)();
// Initialize Razorpay client
const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder";
const keySecret = process.env.RAZORPAY_KEY_SECRET || "placeholder_secret";
if (keyId === "rzp_test_placeholder") {
    console.warn("WARNING: RAZORPAY_KEY_ID is not defined in environment variables. Using placeholder.");
}
const razorpay = new razorpay_1.default({
    key_id: keyId,
    key_secret: keySecret,
});
// Create Razorpay Order
router.post("/order", auth_1.requireUserAuth, async (req, res) => {
    const { amount, serviceName } = req.body;
    if (!amount || !serviceName) {
        return res.status(400).json({ error: "Amount and Service Name are required" });
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
        };
        const order = await razorpay.orders.create(options);
        res.json({
            id: order.id,
            amount: order.amount,
            currency: order.currency,
            key_id: keyId, // Return key_id to client so client dynamically configures Razorpay Checkout
            notes: order.notes,
        });
    }
    catch (err) {
        console.error("Razorpay order creation error:", err);
        res.status(500).json({ error: "Failed to create order", details: err.message });
    }
});
// Verify Razorpay Payment and update Ledger
router.post("/verify", auth_1.requireUserAuth, async (req, res) => {
    const { paymentId, orderId, signature, serviceName, amount } = req.body;
    if (!paymentId || !orderId || !signature || !serviceName || !amount) {
        return res.status(400).json({ error: "Missing verification details" });
    }
    try {
        // Generate signature using keySecret and check against client signature
        const generatedSignature = crypto_1.default
            .createHmac("sha256", keySecret)
            .update(`${orderId}|${paymentId}`)
            .digest("hex");
        if (generatedSignature !== signature) {
            return res.status(400).json({ error: "Invalid payment signature verification failed" });
        }
        const user = await user_1.default.findById(req.user.id);
        if (!user)
            return res.status(404).json({ error: "User not found" });
        // Find the service and mark it as paid
        const service = user.services.find((s) => s.name === serviceName);
        if (service) {
            service.paid = true;
            service.status = "In Progress";
            service.price = amount;
        }
        else {
            // If service is not listed, push it
            user.services.push({
                name: serviceName,
                status: "In Progress",
                price: amount,
                paid: true,
            });
        }
        // Add to payments ledger
        user.payments.push({
            serviceName,
            amount,
            paymentId,
            orderId,
            date: new Date(),
        });
        await user.save();
        res.json({ success: true, user });
    }
    catch (err) {
        console.error("Razorpay payment verification error:", err);
        res.status(500).json({ error: "Failed to verify payment", details: err.message });
    }
});
exports.default = router;
