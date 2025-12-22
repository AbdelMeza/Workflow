import mongoose from "mongoose"

const clientSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'project' }],
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'userFreelance' }
}, { timestamps: true })

export const clientModel = mongoose.model("client", clientSchema)