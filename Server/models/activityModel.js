import mongoose from "mongoose"

const activityTypes = [
    "project_creation",
    "project_modification",
    "project_deletion",
    "client_affiliation",
    "file_upload",
    "request_response",
    "security",
    "profile_modification",
]

const activitySchema = new mongoose.Schema({
    type: { type: String, required: true, enum: activityTypes },
    title: { type: String, required: true },
    details: { type: String, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'project' },
}, { timestamps: true })


export const activityModel = mongoose.model("activity", activitySchema)