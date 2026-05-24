"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const message_1 = __importDefault(require("../models/message"));
const router = (0, express_1.Router)();
const seedMessages = [
    {
        name: "Aryan Kapoor",
        email: "aryan@example.com",
        message: "Hi, I run a D2C skincare brand based in Mumbai. Would love to understand your paid social offering in more detail before we schedule a call.",
        read: false,
        isWorkspace: false,
    },
    {
        name: "Priya Sharma",
        email: "priya@example.com",
        message: "We have about 40 active clients and our follow-up process is completely manual. Looking for a CRM automation system urgently.",
        read: false,
        isWorkspace: false,
    },
    {
        name: "Rahul Nair",
        email: "rahul@example.com",
        message: "I'm a freelance media buyer and I'd love to explore a referral partnership arrangement. Happy to jump on a call this week.",
        read: true,
        isWorkspace: false,
    },
];
// Public route to submit a new message from the contact form
router.post("/", async (req, res) => {
    try {
        const newItem = new message_1.default({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            isWorkspace: false,
        });
        await newItem.save();
        res.status(201).json(newItem);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to submit message", details: err.message });
    }
});
// Protected routes for the admin dashboard (fetches general contact inquiries)
router.get("/", auth_1.requireAuth, async (req, res) => {
    try {
        let items = await message_1.default.find({ isWorkspace: false }).sort({ createdAt: -1 });
        if (items.length === 0) {
            await message_1.default.insertMany(seedMessages);
            items = await message_1.default.find({ isWorkspace: false }).sort({ createdAt: -1 });
        }
        res.json(items);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch messages", details: err.message });
    }
});
// Get single message by ID
router.get("/:id", auth_1.requireAuth, async (req, res) => {
    try {
        const item = await message_1.default.findById(req.params.id);
        if (!item)
            return res.status(404).json({ error: "Not found" });
        res.json(item);
    }
    catch (err) {
        res.status(500).json({ error: "Error fetching message", details: err.message });
    }
});
// Mark message as read
router.patch("/:id/read", auth_1.requireAuth, async (req, res) => {
    try {
        const updated = await message_1.default.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
        if (!updated)
            return res.status(404).json({ error: "Not found" });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to mark message read", details: err.message });
    }
});
// Delete message
router.delete("/:id", auth_1.requireAuth, async (req, res) => {
    try {
        const deleted = await message_1.default.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ error: "Not found" });
        res.json({ success: true });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete message", details: err.message });
    }
});
exports.default = router;
