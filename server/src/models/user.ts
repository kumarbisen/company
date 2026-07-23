import mongoose, { Schema, Document } from "mongoose"

export interface IServiceItem {
  name: string
  status: "In Discussion" | "In Progress" | "Completed" | "Pending Payment"
  price: number
  paid: boolean
}

export interface IPaymentRecord {
  serviceName: string
  amount: number
  paymentId: string
  orderId: string
  date: Date
}

export interface IBrief {
  companyName: string
  primaryGoal: string
  phone: string
  budget: string
  details: string
  submittedAt: Date
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}

export interface IUser extends Document {
  email: string
  name: string
  avatar?: string
  firebaseUid?: string
  providerId?: string
  emailVerified?: boolean
  createdAt: Date
  brief?: IBrief
  services: IServiceItem[]
  payments: IPaymentRecord[]
}


const BriefSchema = new Schema<IBrief>({
  companyName: { type: String, required: true },
  primaryGoal: { type: String, required: true },
  phone: { type: String, required: true },
  budget: { type: String, required: true },
  details: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  utmSource: { type: String },
  utmMedium: { type: String },
  utmCampaign: { type: String },
})

const ServiceItemSchema = new Schema<IServiceItem>({
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ["In Discussion", "In Progress", "Completed", "Pending Payment"],
    default: "In Discussion",
  },
  price: { type: Number, default: 0 },
  paid: { type: Boolean, default: false },
})

const PaymentRecordSchema = new Schema<IPaymentRecord>({
  serviceName: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentId: { type: String, required: true },
  orderId: { type: String, required: true },
  date: { type: Date, default: Date.now },
})

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: { type: String },
  firebaseUid: { type: String, index: true },
  providerId: { type: String },
  emailVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  brief: { type: BriefSchema },
  services: { type: [ServiceItemSchema], default: [] },
  payments: { type: [PaymentRecordSchema], default: [] },
})


export default mongoose.model<IUser>("User", UserSchema)
