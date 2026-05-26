"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.markMessageRead = exports.createMessage = exports.getMessageById = exports.getAllMessages = exports.deleteStory = exports.updateStory = exports.createStory = exports.getStoryById = exports.getAllStories = exports.deleteFeedItem = exports.updateFeedItem = exports.createFeedItem = exports.getFeedItemById = exports.getAllFeedItems = void 0;
let feedItems;
let topStories;
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
