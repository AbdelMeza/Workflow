import mongoose from "mongoose"

const projectsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "user"},
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    budget: { type: Number, required: true },
    deadline: { type: Date, default: () => { return new Date("2026-06-04") } },
    status: { type: String, enum: ["open", "in progress", "completed", "cancelled"], default: "open" },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'task' }]
}, { timestamps: true })

export const projectsModel = mongoose.model("project", projectsSchema)

