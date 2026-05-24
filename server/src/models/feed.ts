import mongoose, { Schema, Document } from "mongoose"

export interface IFeedItem extends Document {
  title: string
  meta: string
  text: string
  link?: string
}

const FeedItemSchema = new Schema<IFeedItem>({
  title: { type: String, required: true },
  meta: { type: String, required: true },
  text: { type: String, required: true },
  link: { type: String },
})

export default mongoose.model<IFeedItem>("FeedItem", FeedItemSchema)
