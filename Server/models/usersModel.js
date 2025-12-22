import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, enum: ["freelancer", "client"] }
})

export const usersModel = mongoose.model("user", userSchema)