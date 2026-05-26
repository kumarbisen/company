"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const user_1 = __importDefault(require("../models/user"));
const message_1 = __importDefault(require("../models/message"));
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.Router)();
/* ─── USER WORKSPACE ROUTES ─── */
// Get current user's workspace profile (including briefs, services, payments)
router.get("/", auth_1.requireUserAuth, async (req, res) => {
    try {
        const user = await user_1.default.findById(req.user.id);
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch workspace", details: err.message });
    }
});
// Submit/Update Brief
router.post("/brief", auth_1.requireUserAuth, async (req, res) => {
    const { companyName, primaryGoal, phone, budget, details } = req.body;
    if (!companyName || !primaryGoal || !phone || !budget || !details) {
        return res.status(400).json({ error: "Missing brief fields" });
    }
    try {
        const user = await user_1.default.findById(req.user.id);
        if (!user)
            return res.status(404).json({ error: "User not found" });
        user.brief = {
            companyName,
            primaryGoal,
            phone,
            budget,
            details,
            submittedAt: new Date(),
        };
        const alreadyExists = user.services.find((s) => s.name === primaryGoal);
        if (!alreadyExists) {
            user.services.push({
                name: primaryGoal,
                status: "In Discussion",
                price: 0,
                paid: false,
            });
        }
        await user.save();
        await new message_1.default({
            message: `New brief submitted by ${user.name} (${user.email}) for ${companyName}. Goal: ${primaryGoal}`,
            userId: user._id,
            sender: "user",
            isWorkspace: true,
        }).save();
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to save brief", details: err.message });
    }
});
// Select a new service suite
router.post("/services", auth_1.requireUserAuth, async (req, res) => {
    const { serviceName } = req.body;
    if (!serviceName)
        return res.status(400).json({ error: "Missing serviceName" });
    try {
        const user = await user_1.default.findById(req.user.id);
        if (!user)
            return res.status(404).json({ error: "User not found" });
        const alreadyExists = user.services.find((s) => s.name === serviceName);
        if (alreadyExists) {
            return res.status(400).json({ error: "Service is already added to your workspace" });
        }
        user.services.push({
            name: serviceName,
            status: "In Discussion",
            price: 0,
            paid: false,
        });
        await user.save();
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to add service", details: err.message });
    }
});
// Fetch workspace chat messages between user and admin
router.get("/messages", auth_1.requireUserAuth, async (req, res) => {
    try {
        const chat = await message_1.default.find({
            userId: new mongoose_1.default.Types.ObjectId(req.user.id),
            isWorkspace: true,
        }).sort({ createdAt: 1 });
        res.json(chat);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch chat messages", details: err.message });
    }
});
// Send workspace chat message (User to Admin)
router.post("/messages", auth_1.requireUserAuth, async (req, res) => {
    const { message } = req.body;
    if (!message)
        return res.status(400).json({ error: "Message content required" });
    try {
        const newMsg = new message_1.default({
            message,
            userId: new mongoose_1.default.Types.ObjectId(req.user.id),
            sender: "user",
            isWorkspace: true,
        });
        await newMsg.save();
        res.status(201).json(newMsg);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to send message", details: err.message });
    }
});
/* ─── ADMIN SIDE WORKSPACE ROUTES ─── */
// Get all active client workspaces (Briefs, selected services, payments)
router.get("/admin/workspaces", auth_1.requireAuth, async (req, res) => {
    try {
        const clients = await user_1.default.find().sort({ createdAt: -1 });
        res.json(clients);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch client workspaces", details: err.message });
    }
});
// Get a specific client's workspace
router.get("/admin/workspaces/:userId", auth_1.requireAuth, async (req, res) => {
    try {
        const client = await user_1.default.findById(req.params.userId);
        if (!client)
            return res.status(404).json({ error: "Client not found" });
        res.json(client);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch workspace", details: err.message });
    }
});
// Update client service status & price (Admin to Client)
router.post("/admin/workspaces/:userId/services", auth_1.requireAuth, async (req, res) => {
    const { serviceName, status, price, paid } = req.body;
    if (!serviceName)
        return res.status(400).json({ error: "serviceName is required" });
    try {
        const client = await user_1.default.findById(req.params.userId);
        if (!client)
            return res.status(404).json({ error: "Client not found" });
        const service = client.services.find((s) => s.name === serviceName);
        if (!service)
            return res.status(404).json({ error: "Service not found in client's list" });
        if (status !== undefined)
            service.status = status;
        if (price !== undefined)
            service.price = price;
        if (paid !== undefined)
            service.paid = paid;
        await client.save();
        res.json(client);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update service details", details: err.message });
    }
});
// Get workspace chat messages for a specific client (Admin view)
router.get("/admin/workspaces/:userId/messages", auth_1.requireAuth, async (req, res) => {
    try {
        const chat = await message_1.default.find({
            userId: new mongoose_1.default.Types.ObjectId(req.params.userId),
            isWorkspace: true,
        }).sort({ createdAt: 1 });
        res.json(chat);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch chat messages", details: err.message });
    }
});
// Send workspace chat message (Admin to User)
router.post("/admin/workspaces/:userId/messages", auth_1.requireAuth, async (req, res) => {
    const { message } = req.body;
    if (!message)
        return res.status(400).json({ error: "Message content required" });
    try {
        const newMsg = new message_1.default({
            message,
            userId: new mongoose_1.default.Types.ObjectId(req.params.userId),
            sender: "admin",
            isWorkspace: true,
        });
        await newMsg.save();
        res.status(201).json(newMsg);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to send message", details: err.message });
    }
});
exports.default = router;
