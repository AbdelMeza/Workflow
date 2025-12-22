import { usersModel } from "../models/usersModel.js"
import { freelancerModel } from "../models/freelancerModel.js"
import { clientModel } from "../models/clientModel.js"
import { readToken } from "../utils/token.js"

export async function getUserData(req, res) {
    try {
        const token = req.headers.token

        if (!token) {
            return res.status(401).json({
                error: "Authentication token missing"
            })
        }

        // 1. Read the token
        const decoded = readToken(token)

        if (!decoded || !decoded.id) {
            return res.status(401).json({
                error: "Invalid or expired token"
            })
        }

        // 2. Find the user (AUTH)
        const user = await usersModel.findById(decoded.id).select("username email role")

        if (!user) {
            return res.status(401).json({
                error: "User not found"
            })
        }

        // 3. Change the profile depending on the role
        let profile = null

        if (user.role === "freelancer") {
            profile = await freelancerModel.findOne({ userId: user._id }).populate("projects clients tasks")
        }

        if (user.role === "client") {
            profile = await clientModel.findOne({ userId: user._id }).populate("projects freelancer")
        }

        // 4. Response
        res.status(200).json({
            user
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Internal server error"
        })
    }
}
