import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: { type: String, enum: ["freelancer", "client"] }
})

export const usersModel = mongoose.model("user", userSchema)