import mongoose, { Schema, Document } from "mongoose"

export interface IStory extends Document {
  title: string
  category: string
  excerpt: string
  link?: string
  image?: string
}

const StorySchema = new Schema<IStory>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  excerpt: { type: String, required: true },
  link: { type: String, default: "#" },
  image: { type: String },
})

export default mongoose.model<IStory>("Story", StorySchema)
