import mongoose, { Document, Schema, Types } from "mongoose";

export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "pending" | "in-progress" | "completed" | "cancelled";

export interface ITask extends Document {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  dueDate: Date;
  priority: TaskPriority;
  status: TaskStatus;
  relatedTo?: {
    type: "lead";
    id: Types.ObjectId;
  };
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "cancelled"],
      default: "pending"
    },
    relatedTo: {
      type: {
        type: String,
        enum: ["lead"]
      },
      id: { type: Schema.Types.ObjectId, ref: "Lead" }
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);