import mongoose from "mongoose"

export const activityTypes = {
    title: "Activity types",
    data: [
        {
            type: "project_creation",
            value: "Project Creation"
        },
        {
            type: "project_modification",
            value: "Project Modification"
        },
        {
            type: "project_deletion",
            value: "Project Deletion"
        },
        {
            type: "client_affiliation",
            value: "Client Affiliation"
        },
        {
            type: "file_upload",
            value: "File Upload"
        },
        {
            type: "request_response",
            value: "Request Response"
        },
        {
            type: "security",
            value: "Security"
        },
        {
            type: "profile_modification",
            value: "Profile Modification"
        },
    ]
}


const activitySchema = new mongoose.Schema({
    type: { type: String, required: true, enum: activityTypes.data.map(activity => activity.type) },
    title: { type: String, required: true },
    details: { type: String, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'project' },
}, { timestamps: true })


export const activityModel = mongoose.model("activity", activitySchema)