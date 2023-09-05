import mongoose from "mongoose";

// The model file runs again and again in nextjs unlike express

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true
  },
  firstName: {
    type: String,
    required: [true, "Please provide a firstname"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a lastname"],
  },
  email: {
    type: String,
    required: [true, "Please enter a email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please, provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: String,
})

// mongo changes the mode to lowercase
const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User;