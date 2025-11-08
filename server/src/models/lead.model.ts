import mongoose, { Document, Schema, Types } from "mongoose";

export type LeadStatus = "new" | "contacted" | "qualified" | "lost";
export type LeadSource = "website" | "referral" | "social" | "direct" | "other";

export interface ILead extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  company?: string;
  source: LeadSource;
  status: LeadStatus;
  notes?: string;
  createdBy: Types.ObjectId;
  lastContacted?: Date;
  nextFollowUp?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String },
    source: {
      type: String,
      enum: ["website", "referral", "social", "direct", "other"],
      default: "website"
    },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "lost"],
      default: "new"
    },
    notes: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    lastContacted: { type: Date },
    nextFollowUp: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model<ILead>("Lead", LeadSchema);