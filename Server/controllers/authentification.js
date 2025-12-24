import { userModel } from "../models/userModel.js"
import { comparePasswords, hashPassword } from "../utils/hashPass.js"
import { createToken } from "../utils/token.js"

/**
 * =========================
 * SIGNUP CONTROLLER
 * =========================
 * - Creates a user
 * - Assigns role
 * - Initializes role profile
 */
export async function signupUser(req, res) {
    try {
        const { username, email, password, role } = req.body

        // 1️⃣ Validation
        let errors = []

        if (!username) errors.push({ field: "username", errorMessage: "This field is required" })
        if (!email) errors.push({ field: "email", errorMessage: "This field is required" })
        if (!password) errors.push({ field: "password", errorMessage: "This field is required" })
        if (!role) errors.push({ field: "role", errorMessage: "This field is required" })

        if (errors.length) return res.status(400).json(errors)

        // 2️⃣ User exists ?
        const userExists = await userModel.findOne({
            $or: [{ username }, { email }]
        })

        if (userExists) {
            return res.status(400).json({
                field: "email",
                errorMessage: "Account already exists"
            })
        }

        // 3️⃣ Email format
        if (!validateEmail(email)) {
            return res.status(400).json({
                field: "email",
                errorMessage: "Invalid email format"
            })
        }

        // 4️⃣ Password strength
        const isPasswordValid = checkPasswordStrength(password)
        if (!isPasswordValid.valid) {
            return res.status(400).json({
                field: "password",
                errorMessage: isPasswordValid.message
            })
        }

        // 5️⃣ Hash password
        const hashedPass = await hashPassword(password)

        // 6️⃣ Create user with embedded profile
        const user = await userModel.create({
            username,
            email,
            password: hashedPass,
            role,
            freelancerProfile: role === "freelancer" ? {} : undefined,
            clientProfile: role === "client" ? {} : undefined
        })

        // 7️⃣ Token
        const token = createToken({
            id: user._id,
            role: user.role
        })

        // 8️⃣ Response
        const userResponse = user.toObject()
        delete userResponse.password

        res.status(201).json({
            user: userResponse,
            token
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Internal server error"
        })
    }
}



/**
 * =========================
 * LOGIN CONTROLLER
 * =========================
 * Handles user authentication:
 * - Finds user by username or email
 * - Verifies password
 * - Returns auth token
 */
export async function loginUser(req, res) {
    try {
        const { identifier, password } = req.body

        let errors = []

        // 1. Validate required fields
        if (!identifier) errors.push({ field: "identifier", errorMessage: "This field is required" })
        if (!password) errors.push({ field: "password", errorMessage: "This field is required" })

        if (errors.length) {
            return res.status(400).json(errors)
        }

        // 2. Find user by username or email
        let user = await userModel
            .findOne({
                $or: [{ username: identifier }, { email: identifier }]
            })
            .select("+password")

        if (!user) {
            return res.status(400).json({
                field: "identifier",
                errorMessage: "Account not found"
            })
        }

        // 3. Compare passwords
        const isValid = await comparePasswords(password, user.password)
        if (!isValid) {
            return res.status(400).json({
                field: "password",
                errorMessage: "Password is incorrect"
            })
        }

        // 4. Generate authentication token
        const token = createToken({
            id: user._id,
            role: user.role
        })

        // 5. Remove password before sending response
        user = user.toObject()
        delete user.password

        res.status(200).json({
            user,
            token
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            field: "all",
            errorMessage: "Server error"
        })
    }
}

/**
 * =========================
 * UTILITIES
 * =========================
 */

// Validate email format using regex
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

// Check password strength rules
function checkPasswordStrength(password) {
    if (password.length < 8) {
        return { valid: false, message: "Password must be at least 8 characters long" }
    }
    if (!/[A-Z]/.test(password)) {
        return { valid: false, message: "Password must contain at least one uppercase letter" }
    }
    if (!/[a-z]/.test(password)) {
        return { valid: false, message: "Password must contain at least one lowercase letter" }
    }
    if (!/\d/.test(password)) {
        return { valid: false, message: "Password must contain at least one number" }
    }
    return { valid: true }
}