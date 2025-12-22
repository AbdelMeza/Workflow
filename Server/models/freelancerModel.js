import mongoose from "mongoose"

const freelancerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'project' }],
    tasks: [{ taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'task' } }],
    clients: [{ clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'client' } }],
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

export const freelancerModel = mongoose.model("userFreelance", freelancerSchema)