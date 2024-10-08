import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Будь-ласка вкажіть імя"],
  },
  email: {
    type: String,
    required: [true, "Будь-ласка вкажіть пошту"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Будь-ласка вкажіть пароль"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  countPosts: {
    type: String,
    default: "0",
  },
  isUserBlocked: {
    type: Boolean,
    default: false,
  },
  countDeletedPostsByAdmin: {
    type: String,
    default: "0",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  rate: {
    type: String,
    default: "0",
  },
  countRate: {
    type: String,
    default: "0",
  },
  verifiedBy: {
    type: String,
    default: "manual",
  },

  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
