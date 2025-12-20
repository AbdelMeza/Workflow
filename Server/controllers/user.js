import { userModel } from "../models/userModel.js"
import { readToken } from "../utils/token.js"

export async function getUserData(req, res) {
    try {
        const { token } = req.headers

        const getToken = readToken(token)

        if (!getToken) {
            res.status(500).json({ error: "Authentification error, try again" })
        }

        let getUser = await userModel.findOne({ username: getToken.username }).select("username role")

        if (!getUser) {
            res.status(500).json({ error: "Authentification error, try again" })
        }

        res.status(200).json({ userData: getUser })
    } catch (error) {
        console.log(error)
    }
}