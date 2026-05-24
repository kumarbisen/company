"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const uri = process.env.MONGO_URI;
async function connectDB() {
    try {
        if (!uri) {
            throw new Error("MONGO_URI is not defined");
        }
        await mongoose_1.default.connect(uri);
        console.log("DB CONNECTED");
    }
    catch (error) {
        console.log("Database connection error:", error);
    }
}
