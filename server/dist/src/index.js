"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const connect_1 = require("./config/connect");
const auth_1 = __importDefault(require("./routes/auth"));
const feed_1 = __importDefault(require("./routes/feed"));
const stories_1 = __importDefault(require("./routes/stories"));
const messages_1 = __importDefault(require("./routes/messages"));
const workspace_1 = __importDefault(require("./routes/workspace"));
const payments_1 = __importDefault(require("./routes/payments"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// Initialize MongoDB Connection
(0, connect_1.connectDB)();
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.ALLOWED_ORIGINS || "http://localhost:5173",
}));
app.use(express_1.default.json());
app.get("/meta", async (req, res) => {
    const url = req.query.url;
    if (!url)
        return res.status(400).json({ error: "missing url" });
    try {
        const resp = await axios_1.default.get(url, { timeout: 7000 });
        const html = resp.data;
        const $ = cheerio_1.default.load(html);
        const title = $("meta[property='og:title']").attr("content") || $("title").text() || null;
        const description = $("meta[property='og:description']").attr("content") || $("meta[name='description']").attr("content") || null;
        return res.json({ title, description });
    }
    catch (err) {
        return res.status(500).json({ error: "failed to fetch", details: err.message });
    }
});
// API Routes
app.use("/api/auth", auth_1.default);
app.use("/api/feed", feed_1.default);
app.use("/api/stories", stories_1.default);
app.use("/api/messages", messages_1.default);
app.use("/api/workspace", workspace_1.default);
app.use("/api/payments", payments_1.default);
// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});
// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
