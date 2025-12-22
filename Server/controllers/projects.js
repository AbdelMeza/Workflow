import { projectsModel } from "../models/projectsModel.js"

/**
 * =========================
 * CREATE PROJECT
 * =========================
 * Creates a new project linked to a client.
 */
export async function createProject(req, res) {
    try {
        const { title, description, clientId } = req.body
        const newProject = new projectsModel({ title, description, clientId })
        await newProject.save()
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
 * Returns all projects.
 */

export async function getProjects(req, res) {
    try {
        const projects = await projectsModel.find().populate('clientId', 'name email')
        res.status(200).json(projects)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

/**
 * =========================
 * GET PROJECT BY ID
 * =========================
 * Returns a single project with optional populated fields.
 */
export async function getProjectById(req, res) {
    try {
        const { id } = req.params
        const project = await projectsModel.findById(id).populate('clientId', 'name email')
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
 * Updates fields of a project.
 */
export async function updateProject(req, res) {
    try {
        const { id } = req.params
        const updates = req.body
        const updatedProject = await projectsModel.findByIdAndUpdate(id, updates, { new: true }).populate('clientId', 'name email')
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
