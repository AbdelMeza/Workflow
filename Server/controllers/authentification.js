import { userModel } from "../models/userModel.js";
import { comparePasswords, hashPassword } from "../utils/hashPass.js";
import { createToken } from "../utils/token.js";

export async function signupUser(req, res) {
    try {
        const { username, email, password, repeatedPassword, role } = req.body

        if (!username || !email || !password || !repeatedPassword || !role) {
            return res.status(400).json({ field: "all", message: "All fields are required" })
        }

        const usernameExists = await userModel.findOne({ username })
        if (usernameExists) {
            return res.status(400).json({ field: "username", message: "Username already exists" })
        }

        const emailExists = await userModel.findOne({ email })
        if (emailExists) {
            return res.status(400).json({ field: "email", message: "Email already exists" })
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ field: "email", message: "Invalid email format" })
        }

        const isPasswordValid = checkPasswordStrength(password);
        if (!isPasswordValid.valid) {
            return res.status(400).json({ field: "password", message: isPasswordValid.message })
        }

        if (password !== repeatedPassword) {
            return res.status(400).json({ field: "repeatedPassword", message: "Passwords must match" })
        }

        const hashedPass = await hashPassword(password);
        if (!hashedPass) {
            return res.status(500).json({ field: "all", message: "Authentication error, please try again" })
        }

        let newUser = await userModel.create({ username, email, password: hashedPass, role })
        newUser = newUser.toObject()
        delete newUser.password

        const userToken = createToken({ id: newUser._id, username, role })
        if (!userToken) {
            return res.status(500).json({ field: "all", message: "Authentication error, please try again" })
        }

        res.status(201).json({ user: newUser, token: userToken })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

export async function loginUser(req, res) {
    try {
        const { identifier, password } = req.body

        if (!identifier || !password) {
            return res.status(400).json({ field: "all", message: "All fields are required" })
        }

        let user = await userModel.findOne({ $or: [{ username: identifier }, { email: identifier }] }).select("+password")
        if (!user) {
            return res.status(400).json({ field: "identifier", message: "Account not found, try again" })
        }

        const isPasswordValid = await comparePasswords(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ field: "password", message: "Password is incorrect, try again" })
        }

        const userToken = createToken({ id: user._id, username: user.username, role: user.role })
        if (!userToken) {
            return res.status(500).json({ field: "all", message: "Authentication error, please try again" })
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
