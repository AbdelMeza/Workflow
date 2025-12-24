import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["client", "freelancer"],
    required: true
  },

  freelancerProfile: {
    skills: [String],
    rate: Number,
    portfolio: String
  },

  clientProfile: {
    companyName: String,
    companyWebsite: String,
  }

}, { timestamps: true })

export const userModel = mongoose.model("user", userSchema)