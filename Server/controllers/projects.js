import { getTimeRemaining } from "../../utils/TimeRemaining/getTimeRemaining.js"
import { projectsModel } from "../models/projectsModel.js"
import { getIO } from "../socket.js"
import { createActivity } from "./activity.js"

/**
 * =========================
 * CREATE PROJECT
 * =========================
 * Creates a new project and links it to a client and the current freelancer.
 * Expects in the request body: title, description, clientId, budget
 */
export async function createProject(req, res) {
    try {
        const { title, description, deadline, clientId, budget } = req.body

        const newProject = await projectsModel.create({
            title,
            description,
            deadline,
            freelancerId: req.user.id, // Current authenticated freelancer
            clientId,
            budget,
            // Set initial status based on deadline
            status: getTimeRemaining(deadline) ? "late" : "open"
        })

        getIO()
            .to(req.user.id.toString())
            .emit("projects:update", { action: "update", project: newProject })

        await createActivity({
            type: "project_creation",
            title: "Created a project",
            details: `Created ${newProject.title} as a new project.`,
            freelancerId: req.user.id,
            projectId: newProject._id
        })

        res.status(201).json(newProject)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

/**
 * =========================
 * GET ALL PROJECTS
 * =========================
 * Returns a paginated list of all projects for the authenticated user.
 * Also calculates projects that are late or with upcoming deadlines.
 * Query parameters:
 *   - page (optional, default: 1)
 *   - limit (optional, default: 10)
 */
export async function getProjects(req, res) {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const filter = req.query.filter || "all"
        const time = req.query.time || "newest"
        const skip = (page - 1) * limit

        const query = {
            $or: [
                { freelancerId: req.user.id },
                { clientId: req.user.id },
            ]
        }

        if (filter !== "all") {
            query.status = filter
        }

        // Fetch projects
        const projects = await projectsModel
            .find(query)
            .sort({ createdAt: time === "newest" ? -1 : 1 })
            .skip(skip)
            .limit(limit)
            .populate("clientId", "username email")
            .populate("freelancerId", "username email")

        // Stats
        const total = await projectsModel.countDocuments(query)
        const totalPages = Math.ceil(total / limit)

        const totalProjectsCompleted = await projectsModel.countDocuments({
            ...query,
            status: "completed"
        })

        const totalLateProjects = await projectsModel.countDocuments({
            ...query,
            status: "late"
        })

        const projectsList = await projectsModel.find(query)
        const estimatedRevenue = projectsList.reduce((sum, p) => sum + (p.budget || 0), 0)

        const today = new Date()
        const in7Days = new Date()
        in7Days.setDate(today.getDate() + 7)

        // Update statuses for projects if deadline is approaching
        //if deadline is passed 
        await projectsModel.updateMany(
            {
                status: { $ne: "completed" },
                deadline: { $lte: in7Days }
            },
            {
                $set: { status: "late" }
            }
        )

        //find by status and by userId
        const lateProjects = await projectsModel.find({
            ...query,
            status: "late"
        })
            .populate("clientId", "username email")
            .sort({ deadline: 1 })

        res.status(200).json({
            projectsData: {
                projects,
                lateProjects,
                totalProjects: total,
                totalLateProjects,
                estimatedRevenue,
                totalProjectsCompleted
            },
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

/**
 * =========================
 * GET PROJECT BY ID
 * =========================
 * Returns a single project by its ID.
 * Populates client and freelancer details (username and email).
 * URL parameter: id (project ID)
 */
export async function getProjectById(req, res) {
    try {
        const { id } = req.params

        const project = await projectsModel
            .findById(id)
            .populate({
                path: 'clientId',
                populate: { path: 'userId', select: 'username email' }
            })
            .populate({
                path: 'freelancerId',
                populate: { path: 'userId', select: 'username email' }
            })

        if (!project) {
            return res.status(404).json({ error: "Project not found" })
        }

        res.status(200).json(project)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

/**
 * =========================
 * UPDATE PROJECT
 * =========================
 * Updates the fields of a project by its ID.
 * URL parameter: id (project ID)
 * Body: any fields to update (e.g., title, description, clientId, budget, status)
 */
export async function updateProject(req, res) {
    try {
        const { id } = req.params
        const updates = req.body

        const updatedProject = await projectsModel
            .findByIdAndUpdate(id, updates, { new: true })
            .populate({
                path: 'clientId',
                populate: { path: 'userId', select: 'username email' }
            })
            .populate({
                path: 'freelancerId',
                populate: { path: 'userId', select: 'username email' }
            })

        if (!updatedProject) {
            return res.status(404).json({ error: "Project not found" })
        }

        res.status(200).json(updatedProject)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

/**
 * =========================
 * DELETE PROJECT
 * =========================
 * Deletes a project by its ID.
 */
export async function deleteProject(req, res) {
    try {
        const { id } = req.body

        const deletedProject = await projectsModel.findByIdAndDelete(id)

        if (!deletedProject) {
            return res.status(404).json({ error: "Project not found" })
        }

        const io = getIO()

        io
            .to(req.user.id.toString())
            .to(deletedProject.clientId?.toString())
            .emit("projects:update", { action: "delete", project: deletedProject })

        await createActivity({
            type: "project_deletion",
            title: "Deleted a project",
            details: `Deleted ${deletedProject.title} from your projects.`,
            freelancerId: req.user.id,
            projectId: deletedProject._id
        })

        res.status(200).json({ message: "Project deleted successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}