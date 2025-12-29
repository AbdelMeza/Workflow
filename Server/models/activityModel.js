//activity schema to be referenced in user model
import mongoose from "mongoose"

const activitySchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g., "task_completed", "project_created"
    details: { type: String, required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'project', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
}, { timestamps: true })


export const activityModel = mongoose.model("activity", activitySchema)