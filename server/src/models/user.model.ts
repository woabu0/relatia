import mongoose, { Document, Schema, Types } from "mongoose";

export type Role = "admin" | "user";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: Role;
  companyName?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    companyName: { type: String },
    phone: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);