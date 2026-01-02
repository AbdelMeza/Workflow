import { io } from "../server.js"
import { activityModel } from "../models/activityModel"

export async function createActivity({ userId, type, data }) {
    try {
        const activity = await activityModel.create({ userId, type, data })

        io.to(userId).emit("activity_new", activity)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
}