import mongoose, { Document, Schema, Types } from "mongoose";

export type TicketStatus = "open" | "in-progress" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "urgent";

export interface ITicket extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  createdBy: Types.ObjectId;
  assignedTo?: Types.ObjectId;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const TicketSchema = new Schema<ITicket>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved", "closed"],
      default: "open"
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium"
    },
    category: {
      type: String,
      required: true,
      enum: ["technical", "billing", "feature-request", "bug", "other"]
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    attachments: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model<ITicket>("Ticket", TicketSchema);