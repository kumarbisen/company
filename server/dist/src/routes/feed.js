"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const feed_1 = __importDefault(require("../models/feed"));
const router = (0, express_1.Router)();
const seedFeedItems = [
    {
        title: "Clinic & salon brand needs automated queue management",
        meta: "Bihar · Growth · 3 month ago",
        text: "High walk-in volume and chaotic scheduling causing customer drop-offs. Needed a robust, custom platform to streamline daily appointments and handle ticketing smoothly.",
        link: "https://bookaly.app",
    },
    {
        title: "High-profile astrologer wants to scale community reach",
        meta: "Mumbai · Automation · 28 min ago",
        text: "Looking to build a consistent personal brand across platforms. Needs high-quality short-form content and active profile management to convert organic views into consultation bookings.",
        link: "https://www.instagram.com/astro_vidya_/",
    },
    {
        title: "Scale-up D2C brand needs social media marketing",
        meta: "Delhi NCR · Creative · 5 days ago",
        text: "Struggling with rising customer demands of achar made with love of dadi hands",
        link: "https://www.instagram.com/dadinanikaachar/",
    },
];
// Get all feed items
router.get("/", async (req, res) => {
    try {
        let items = await feed_1.default.find().sort({ _id: -1 });
        if (items.length === 0) {
            await feed_1.default.insertMany(seedFeedItems);
            items = await feed_1.default.find().sort({ _id: -1 });
        }
        res.json(items);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch feed items", details: err.message });
    }
});
// Get single feed item
router.get("/:id", async (req, res) => {
    try {
        const item = await feed_1.default.findById(req.params.id);
        if (!item)
            return res.status(404).json({ error: "Not found" });
        res.json(item);
    }
    catch (err) {
        res.status(500).json({ error: "Error fetching item", details: err.message });
    }
});
// Create feed item
router.post("/", auth_1.requireAuth, async (req, res) => {
    try {
        const newItem = new feed_1.default(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to create item", details: err.message });
    }
});
// Update feed item
router.put("/:id", auth_1.requireAuth, async (req, res) => {
    try {
        const updated = await feed_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated)
            return res.status(404).json({ error: "Not found" });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update item", details: err.message });
    }
});
// Delete feed item
router.delete("/:id", auth_1.requireAuth, async (req, res) => {
    try {
        const deleted = await feed_1.default.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ error: "Not found" });
        res.json({ success: true });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete item", details: err.message });
    }
});
exports.default = router;
