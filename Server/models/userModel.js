import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ['freelancer', 'client'],
        required: true
    },
    projects: {
        type: [Object]
    },
    services: {
        type: [String]
    },
    portfolioUrl: {
        type: String
    },
    socials: {
        type: [Object]
    }
}, { timestamps: true })

export const userModel = mongoose.model("user", userSchema)