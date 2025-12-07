import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    provider: {
      type: String,
      enum: ['credentials', 'google', 'github'],
      default: 'credentials',
    },
    emailVerified: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);