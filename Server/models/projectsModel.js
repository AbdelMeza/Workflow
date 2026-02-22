import mongoose from "mongoose"

export const projectStatus = {
    title: "Project types",
    data: [
        { title: "Open", value: "open" },
        { title: "In Progress", value: "in progress" },
        { title: "Completed", value: "completed" },
        { title: "Cancelled", value: "cancelled" },
        { title: "Late", value: "late" }
    ]
}

const projectsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    budget: { type: Number, required: true },
    deadline: { type: Date },
    status: { type: String, enum: projectStatus.data.map(status => status.value), default: "open" },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'task' }]
}, {
    timestamps: true,
})

export const projectsModel = mongoose.model("project", projectsSchema)