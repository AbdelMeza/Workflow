import { activityTypes } from "../models/activityModel.js"
import { projectStatus } from "../models/projectsModel.js"

export async function getActivitiesTypes(req, res) {
    try {
        if (!req.user.id) return res.status(500).json("Server error, can not get user activies")
        if (!activityTypes || activityTypes.length === 0) return res.status(404).json({ message: "No activity types found" })

        res.status(200).json(activityTypes)
    } catch (error) {
        console.log(error)
    }
}

export async function getProjectsStatus(req, res) {
    try {
        if (!req.user.id) return res.status(500).json("Server error, can not get user activies")
        if (!projectStatus || projectStatus.length === 0) return res.status(404).json({ message: "No project status found" })
        res.status(200).json(projectStatus)
    } catch (error) {
        console.log(error)
    }
}