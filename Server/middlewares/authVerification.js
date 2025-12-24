import { readToken } from "../utils/token.js"

export function requireAuth(req, res, next) {
    try {
        const token = req.headers.token

        if (!token) {
            return res.status(401).json({ error: "Authentication required" })
        }

        const decoded = readToken(token)

        if (!decoded) {
            return res.status(401).json({ error: "Invalid token" })
        }

        // We attach the user to the request
        req.user = {
            id: decoded.id,
            role: decoded.role
        }

        next()
    } catch (error) {
        return res.status(401).json({ error: "Authentication failed" })
    }
}
