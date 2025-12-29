import mongoose from "mongoose"

const tasksSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "project", required: true },
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    status: { type: String, enum: ["to do", "in progress", "blocked", "done"], default: "to do" },
    dueDate: { type: Date, default: () => { return new Date() } },
}, { timestamps: true })

export const tasksModel = mongoose.model("task", tasksSchema)