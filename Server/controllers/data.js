import { activityTypes } from "../models/activityModel.js"
import { projectStatus } from "../models/projectsModel.js"
import { services } from "../models/Services.js"

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

export async function getServices(req, res) {
    try {
        if (!req.user.id) return res.status(500).json("Server error, can not get user activies")
        if (!services || services.length === 0) return res.status(404).json({ message: "No services found" })
        res.status(200).json(services)
    } catch (error) {
        console.log(error)
    }
}

export async function searchService(req, res) {
    try {
        if (!req.user.id) return res.status(500).json("Server error, can not get user activies")
        const query = req.query.search || ""
        const matchedServices = services.filter(service =>
            service.title.toLowerCase().includes(query.toLowerCase())
        )
        res.status(200).json(matchedServices)
    } catch (error) {
        console.log(error)
    }
}