import mongoose from "mongoose"

export const activityTypes = {
    title: "Activity types",
    data: [
        { value: "project_creation", title: "Project Creation" },
        { value: "project_modification", title: "Project Modification" },
        { value: "project_deletion", title: "Project Deletion" },
        { value: "client_affiliation", title: "Client Affiliation" },
        { value: "file_upload", title: "File Upload" },
        { value: "request_response", title: "Request Response" },
        { value: "security", title: "Security" },
        { value: "profile_modification", title: "Profile Modification" },
    ]
}


const activitySchema = new mongoose.Schema({
    type: { type: String, required: true, enum: activityTypes.data.map(activity => activity.value) },
    title: { type: String, required: true },
    details: { type: String, required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'project' },
}, { timestamps: true })


export const activityModel = mongoose.model("activity", activitySchema)