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

export async function getActivities(req, res) {
    try {
        console.log(req.query)
        if (!req.user.id) return res.status(500).json("Server error, can not get user activies")
        const filter = req.query.filter || "all"
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const time = req.query.time || "newest"
        const skip = (page - 1) * limit

        const query = { freelancerId: req.user.id }
        if (filter !== "all") {
            query.type = filter
        }

        const activities = await activityModel
            .find(query)
            .sort({ createdAt: time === "newest" ? -1 : 1 })
            .populate("projectId", "title")
            .skip(skip)
            .limit(limit)


        const totalActivities = await activityModel.countDocuments(query)

        res.status(200).json({
            activities,
            pagination: {
                page: page,
                totalPages: Math.ceil(totalActivities / limit),
                hasNextPage: page * limit < totalActivities,
                hasPrevPage: page > 1
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Internal server error"
        })
    }
}
