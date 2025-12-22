import mongoose from "mongoose"

const projectsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "client", required: true },
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "userFreelance" },
    budget: { type: Number, required: true },
    deadline: { type: Date },
    status: { type: String, enum: ["open", "in progress", "completed", "cancelled"], default: "open" },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'task' }]
}, { timestamps: true })

export const projectsModel = mongoose.model("project", projectsSchema)