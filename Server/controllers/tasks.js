import { tasksModel } from "../models/tasksModel.js"

export async function createTask(req, res) {
    try {
        const { title, description, projectId } = req.body
        const newTask = await tasksModel.create({ title, description, freelancerId: req.user.id, projectId })

        res.status(201).json(newTask)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export async function getTasks(req, res) {
    try {
        const tasks = await tasksModel
            .find({ freelancerId: req.user.id })
            .populate("projectId", "title")
            .sort({ createdAt: -1 })

        res.status(200).json(tasks)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}