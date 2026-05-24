"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.get('/meta', async (req, res) => {
    const url = req.query.url;
    if (!url)
        return res.status(400).json({ error: 'missing url' });
    try {
        const resp = await axios_1.default.get(url, { timeout: 7000 });
        const html = resp.data;
        const $ = cheerio_1.default.load(html);
        const title = $('meta[property="og:title"]').attr('content') || $('title').text() || null;
        const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || null;
        return res.json({ title, description });
    }
    catch (err) {
        return res.status(500).json({ error: 'failed to fetch', details: err.message });
    }
});
app.listen(PORT, () => console.log(`meta server listening on ${PORT}`));
