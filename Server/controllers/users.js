import { userModel } from "../models/userModel.js"
import { projectsModel } from "../models/projectsModel.js"
import { readToken } from "../utils/token.js"

export async function getUserData(req, res) {
    try {
        const token = req.headers.token

        if (!token) {
            return res.status(401).json({
                error: "Authentication token missing"
            })
        }

        // 1️⃣ Decode token
        const decoded = readToken(token)

        if (!decoded?.id) {
            return res.status(401).json({
                error: "Invalid or expired token"
            })
        }

        // 2️⃣ Get user
        const user = await userModel
            .findById(decoded.id)
            .select("username email role")

        if (!user) {
            return res.status(401).json({
                error: "User not found"
            })
        }

        // 3️⃣ Get projects depending on role
        let projects = []

        if (user.role === "freelancer") {
            projects = await projectsModel
                .find({ freelancerId: user._id })
                .populate("clientId", "username email")
                .sort({ createdAt: -1 })
        }

        if (user.role === "client") {
            projects = await projectsModel
                .find({ clientId: user._id })
                .populate("freelancerId", "username email")
                .sort({ createdAt: -1 })
        }

        // 4️⃣ Response
        res.status(200).json({
            user,
            projects
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

