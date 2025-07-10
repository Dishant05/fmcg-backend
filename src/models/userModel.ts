import mongoose from "mongoose";
export type UserRole = "admin" | "customer";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "customer", enum: ["admin", "customer"] },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
