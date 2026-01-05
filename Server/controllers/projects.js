import { projectsModel } from "../models/projectsModel.js"

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
            budget
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
        const skip = (page - 1) * limit

        const filter = {
            $or: [
                { freelancerId: req.user.id },
                { clientId: req.user.id }
            ]
        }

        //calculate the estimated revenue by adding the budget of all projects
        const projectsList = await projectsModel.find(filter)
        const estimatedRevenue = projectsList.reduce((total, project) => total + (project.budget || 0), 0)

        //Count completed projects
        const totalProjectsCompleted = await projectsModel.countDocuments({
            ...filter,
            status: "completed"
        })

        // Count total projects
        const total = await projectsModel.countDocuments(filter)
        const totalPages = Math.ceil(total / limit)

        const today = new Date()
        const in7Days = new Date()
        in7Days.setDate(today.getDate() + 7)

        // Projects "late" or with deadlines in the next 7 days
        const lateProjects = await projectsModel.find({
            $or: [
                { freelancerId: req.user.id },
                { clientId: req.user.id }
            ],
            status: { $ne: "completed" },
            deadline: {
                $gte: today,
                $lte: in7Days
            }
        })
            .populate("clientId", "username")
            .populate("freelancerId", "username")
            .sort({ deadline: 1 })

        const totalLateProjects = lateProjects.length

        // Fetch paginated projects
        const projects = await projectsModel
            .find(filter)
            .skip(skip)
            .limit(limit)
            .populate("clientId", "username email role clientProfile")
            .populate("freelancerId", "username email role freelancerProfile")
            .sort({ createdAt: -1 })

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
 * URL parameter: id (project ID)
 */
export async function deleteProject(req, res) {
    try {
        const { id } = req.params

        const deletedProject = await projectsModel.findByIdAndDelete(id)

        if (!deletedProject) {
            return res.status(404).json({ error: "Project not found" })
        }

        res.status(200).json({ message: "Project deleted successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}
