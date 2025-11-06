import mongoose, { Document, Schema } from "mongoose";

export type Role = "admin" | "manager" | "client";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: Role;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "manager", "client"],
      default: "client",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
