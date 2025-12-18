import { userModel } from "../models/userModel.js";
import { comparePasswords, hashPassword } from "../utils/hashPass.js";
import { createToken } from "../utils/token.js";

export async function signupUser(req, res) {
    try {
        const { username, email, password, role } = req.body

        if (!username || !email || !password || !role) {
            let errors = []

            if (!username) {
                errors.push({ field: "username", errorMessage: "This field is required" })
            } if (!email) {
                errors.push({ field: "email", errorMessage: "This field is required" })
            } if (!password) {
                errors.push({ field: "password", errorMessage: "This field is required" })
            } if (!role) {
                errors.push({ field: "role", errorMessage: "This field is required" })
            }

            return res.status(400).json(errors)
        }

        const usernameExists = await userModel.findOne({ username })
        if (usernameExists) {
            return res.status(400).json({ field: "username", errorMessage: "Username already exists" })
        }

        const emailExists = await userModel.findOne({ email })
        if (emailExists) {
            return res.status(400).json({ field: "email", errorMessage: "Email already exists" })
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ field: "email", errorMessage: "Invalid email format" })
        }

        const isPasswordValid = checkPasswordStrength(password)
        if (!isPasswordValid.valid) {
            return res.status(400).json({ field: "password", errorMessage: isPasswordValid.message })
        }

        const hashedPass = await hashPassword(password)
        if (!hashedPass) {
            return res.status(500).json({ field: "all", errorMessage: "Authentication error, please try again" })
        }

        let newUser = await userModel.create({ username, email, password: hashedPass, role: role.trim() })
        newUser = newUser.toObject()
        delete newUser.password

        const userToken = createToken({ id: newUser._id, username, role })
        if (!userToken) {
            return res.status(500).json({ field: "all", errorMessage: "Authentication error, please try again" })
        }

        res.status(201).json({ user: newUser, token: userToken })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error })
    }
}

export async function loginUser(req, res) {
    try {
        const { identifier, password } = req.body

        if (!identifier || !password) {
            let errors = []

            if (!identifier) {
                errors.push({ field: "identifier", errorMessage: "This field is required" })
            } if (!password) {
                errors.push({ field: "password", errorMessage: "This field is required" })
            }

            return res.status(400).json(errors)
        }

        let user = await userModel.findOne({ $or: [{ username: identifier }, { email: identifier }] }).select("+password")
        if (!user) {
            return res.status(400).json({ field: "identifier", errorMessage: "Account not found, try again" })
        }

        const isPasswordValid = await comparePasswords(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ field: "password", errorMessage: "Password is incorrect, try again" })
        }

        const userToken = createToken({ id: user._id, username: user.username, role: user.role })
        if (!userToken) {
            return res.status(500).json({ field: "all", errorMessage: "Authentication error, please try again" })
        }

        user = user.toObject()
        delete user.password

        res.status(200).json({ user: user, token: userToken })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" })
    }
}

export function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

export function checkPasswordStrength(password) {
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
