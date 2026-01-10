import { projectsModel } from "../models/projectsModel.js"
import { userModel } from "../models/userModel.js"
import { getIO } from "../socket.js"

export async function getUserData(req, res) {
    try {
        const user = await userModel
            .findById(req.user.id)
            .select("username email role")


        if (!user) {
            return res.status(401).json({
                error: "User not found"
            })
        }

        res.status(200).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

export async function searchClient(req, res) {
    const search = req.query.search
    try {
        const users = await userModel.find({
            $and: [
                { role: "client" },
                { username: { $regex: search, $options: "i" } }
            ]
        }).select("_id username email")

        if (!users) {
            return res.status(404).json({ error: "No results found" })
        }

        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Server error, try again" })
    }
}

export async function affiliateClient(req, res) {
    const { projectTargeted, clientId, userId } = req.body

    try {
        const user = await userModel.findById({ _id: clientId })

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        if (user.role !== "client") {
            return res.status(404).json({ error: "User must be registrer as a client" })
        }

        const project = await projectsModel.findOne({ _id: projectTargeted })

        if (!project) {
            return res.status(404).json({ error: "Cannot find project" })
        }

        if (project.clientId) {
            return res.status(400).json({ error: "Project already has a client" })
        }

        project.clientId = clientId

        await project.save()
        await project.populate("clientId", "username")
        await project.populate("freelancerId", "username")

        getIO()
            .to(clientId.toString())
            .to(userId.toString())
            .emit("project:clientAssigned", project)


        res.status(200).json({ message: "Client added successfuly" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Server error, try again" })
    }
}