"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
// Create Razorpay Order (Simulated / Sandbox)
router.post("/order", auth_1.requireUserAuth, async (req, res) => {
    const { amount, serviceName } = req.body;
    if (!amount || !serviceName) {
        return res.status(400).json({ error: "Amount and Service Name are required" });
    }
    try {
        // Generate a sandbox order ID
        const randomHex = Math.random().toString(36).substring(2, 10).toUpperCase();
        const orderId = `order_${randomHex}`;
        res.json({
            id: orderId,
            amount: amount * 100, // Razorpay works in paise
            currency: "INR",
            notes: {
                serviceName,
                userId: req.user.id,
            },
        });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to create order", details: err.message });
    }
});
// Verify Razorpay Payment and update Ledger
router.post("/verify", auth_1.requireUserAuth, async (req, res) => {
    const { paymentId, orderId, serviceName, amount } = req.body;
    if (!paymentId || !orderId || !serviceName || !amount) {
        return res.status(400).json({ error: "Missing verification details" });
    }
    try {
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
        res.status(500).json({ error: "Failed to verify payment", details: err.message });
    }
});
exports.default = router;
