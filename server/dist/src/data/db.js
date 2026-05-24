"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.markMessageRead = exports.createMessage = exports.getMessageById = exports.getAllMessages = exports.deleteStory = exports.updateStory = exports.createStory = exports.getStoryById = exports.getAllStories = exports.deleteFeedItem = exports.updateFeedItem = exports.createFeedItem = exports.getFeedItemById = exports.getAllFeedItems = void 0;
let feedItems = [
    {
        id: 1,
        title: "Clinic & salon brand needs automated queue management",
        meta: "Bihar · Growth · 3 month ago",
        text: "High walk-in volume and chaotic scheduling causing customer drop-offs. Needed a robust, custom platform to streamline daily appointments and handle ticketing smoothly.",
        link: "https://bookaly.app",
    },
    {
        id: 2,
        title: "High-profile astrologer wants to scale community reach",
        meta: "Mumbai · Automation · 28 min ago",
        text: "Looking to build a consistent personal brand across platforms. Needs high-quality short-form content and active profile management to convert organic views into consultation bookings.",
        link: "https://www.instagram.com/astro_vidya_/",
    },
    {
        id: 3,
        title: "Scale-up D2C brand needs social media marketing",
        meta: "Delhi NCR · Creative · 5 days ago",
        text: "Struggling with rising customer demands of achar made with love of dadi hands",
        link: "https://www.instagram.com/dadinanikaachar/",
    },
];
let topStories = [
    {
        id: 1,
        title: "Infosys Unveils AI First Value Framework: Uniquely Positioned to Capture New AI Services Opportunity of Over $300 Billion",
        category: "Technology",
        excerpt: "Infosys announces a new value framework built around AI-first delivery, targeting a rapidly expanding global market opportunity.",
        link: "#",
        image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
    },
    {
        id: 2,
        title: "How Startups Are Winning with Lean Growth Systems Instead of Big Marketing Teams",
        category: "Growth",
        excerpt: "Founders across sectors are discovering that focused service pods outperform bloated in-house marketing departments.",
        link: "#",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    },
    {
        id: 3,
        title: "CRM Automation Is Now the Single Biggest Lever for D2C Revenue Recovery in 2025",
        category: "Automation",
        excerpt: "New industry data shows that brands with automated follow-up sequences recover 38% more abandoned carts and inquiries.",
        link: "#",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    },
    {
        id: 4,
        title: "Why Performance Creative Is the Most Underinvested Area in Indian Startup Marketing",
        category: "Creative",
        excerpt: "Ad fatigue is real — and the solution isn't bigger budgets, it's faster creative iteration cycles and tighter hook strategies.",
        link: "#",
        image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80",
    },
    {
        id: 5,
        title: "From Zero to 50 Qualified Leads a Month: A Mumbai Brand's Systematic Growth Story",
        category: "Case Study",
        excerpt: "A deep-dive into how a premium skincare brand rebuilt their demand engine using content, paid social, and creator operations.",
        link: "#",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
    },
];
let messages = [];
let idCounter = 100;
// Feed Methods
const getAllFeedItems = () => feedItems;
exports.getAllFeedItems = getAllFeedItems;
const getFeedItemById = (id) => feedItems.find((item) => item.id === parseInt(String(id)));
exports.getFeedItemById = getFeedItemById;
const createFeedItem = (data) => {
    const newItem = { id: idCounter++, ...data };
    feedItems = [newItem, ...feedItems];
    return newItem;
};
exports.createFeedItem = createFeedItem;
const updateFeedItem = (id, data) => {
    const idx = feedItems.findIndex((item) => item.id === parseInt(String(id)));
    if (idx !== -1) {
        feedItems[idx] = { ...feedItems[idx], ...data };
        return feedItems[idx];
    }
    return null;
};
exports.updateFeedItem = updateFeedItem;
const deleteFeedItem = (id) => {
    const idx = feedItems.findIndex((item) => item.id === parseInt(String(id)));
    if (idx !== -1) {
        feedItems.splice(idx, 1);
        return true;
    }
    return false;
};
exports.deleteFeedItem = deleteFeedItem;
// Stories Methods
const getAllStories = () => topStories;
exports.getAllStories = getAllStories;
const getStoryById = (id) => topStories.find((item) => item.id === parseInt(String(id)));
exports.getStoryById = getStoryById;
const createStory = (data) => {
    const newItem = { id: idCounter++, ...data };
    topStories = [newItem, ...topStories];
    return newItem;
};
exports.createStory = createStory;
const updateStory = (id, data) => {
    const idx = topStories.findIndex((item) => item.id === parseInt(String(id)));
    if (idx !== -1) {
        topStories[idx] = { ...topStories[idx], ...data };
        return topStories[idx];
    }
    return null;
};
exports.updateStory = updateStory;
const deleteStory = (id) => {
    const idx = topStories.findIndex((item) => item.id === parseInt(String(id)));
    if (idx !== -1) {
        topStories.splice(idx, 1);
        return true;
    }
    return false;
};
exports.deleteStory = deleteStory;
// Messages Methods
const getAllMessages = () => messages;
exports.getAllMessages = getAllMessages;
const getMessageById = (id) => messages.find((m) => m.id === parseInt(String(id)));
exports.getMessageById = getMessageById;
const createMessage = (data) => {
    const newMsg = { id: idCounter++, ...data, read: false, createdAt: new Date().toISOString() };
    messages = [newMsg, ...messages];
    return newMsg;
};
exports.createMessage = createMessage;
const markMessageRead = (id) => {
    const msg = messages.find((m) => m.id === parseInt(String(id)));
    if (msg) {
        msg.read = true;
        return msg;
    }
    return null;
};
exports.markMessageRead = markMessageRead;
const deleteMessage = (id) => {
    const idx = messages.findIndex((m) => m.id === parseInt(String(id)));
    if (idx !== -1) {
        messages.splice(idx, 1);
        return true;
    }
    return false;
};
exports.deleteMessage = deleteMessage;
