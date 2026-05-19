
import mongoose  from "mongoose";
 const uri = process.env.MONGO_URI;

 export async function connectDB (): Promise<void>{
    try {
         if (!uri) {
    throw new Error("MONGO_URI is not defined")
         }
        await mongoose.connect(uri);
         console.log("DB CONNECTED")
        
    } catch (error) {
         console.log("Database connection error:", error)
    }
 }