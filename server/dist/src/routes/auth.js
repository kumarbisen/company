"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = require("../middleware/auth");
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_jwt_key_change_me";
// Admin Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const validUser = process.env.ADMIN_USERNAME || "admin";
    const validHash = process.env.ADMIN_PASSWORD_HASH || "$2b$10$TewTTWQdeiHNhYgYVYL7MursXqvMId9UMAjqXUpbmelJvoh5Mr09i";
    if (username !== validUser) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcryptjs_1.default.compare(password || "", validHash);
    if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jsonwebtoken_1.default.sign({ username, role: "admin" }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, username });
});
// Simulated Gmail Login / Registration
router.post("/gmail-login", async (req, res) => {
    const { email, name, avatar } = req.body;
    if (!email || !name) {
        return res.status(400).json({ error: "Email and Name are required" });
    }
    try {
        let user = await user_1.default.findOne({ email });
        if (!user) {
            user = new user_1.default({
                email,
                name,
                avatar: avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
            });
            await user.save();
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, name: user.name, role: "user" }, JWT_SECRET, { expiresIn: "30d" });
        res.json({ token, user });
    }
    catch (err) {
        res.status(500).json({ error: "Gmail login failed", details: err.message });
    }
});
// Get Admin Profile
router.get("/me", auth_1.requireAuth, (req, res) => {
    res.json({ user: req.admin });
});
// Get Logged-in User Profile
router.get("/user-me", auth_1.requireUserAuth, async (req, res) => {
    try {
        const user = await user_1.default.findById(req.user.id);
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch user profile", details: err.message });
    }
});
exports.default = router;
