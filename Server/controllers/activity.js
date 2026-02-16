import { getIO } from "../socket.js"
import { activityModel } from "../models/activityModel.js"

export async function createActivity({ freelancerId, type, title, details, projectId }) {
    try {
        const activityData = {
            freelancerId,
            type,
            title,
            details,
            projectId
        }

        if (projectId) {
            activityData.projectId = projectId
        }

        const activity = await activityModel.create(activityData)

        const io = getIO()

        io.to(freelancerId.toString()).emit("activity:new", activity)
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getUserActivities(req, res) {
    try {
        if (!req.user.id) return res.status(500).json("Server error, can not get user activies")

        const activities = await activityModel
            .find({ freelancerId: req.user.id })
            .sort({ createdAt: -1 })
            .populate("projectId", "title")

        res.status(200).json(activities)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

