import mongoose, { Schema, Document } from "mongoose"

export interface IMessage extends Document {
  name?: string
  email?: string
  message: string
  read: boolean
  createdAt: Date
  // Workspace specific fields
  userId?: mongoose.Types.ObjectId
  sender: "user" | "admin"
  isWorkspace: boolean
}

const MessageSchema = new Schema<IMessage>({
  name: { type: String },
  email: { type: String },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  sender: { type: String, enum: ["user", "admin"], default: "user" },
  isWorkspace: { type: Boolean, default: false },
})

export default mongoose.model<IMessage>("Message", MessageSchema)
