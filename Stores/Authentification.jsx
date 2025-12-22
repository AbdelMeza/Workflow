import { create } from "zustand";

/**
 * Global authentication store
 * Handles:
 * - authentication errors
 * - user data
 * - login / signup / logout
 * - fetching user data from token
 */
const authentificationManagement = create((set) => ({
    
    // Backend validation / authentication errors
    errors: [],

    /**
     * User data state:
     * - undefined → authentication not checked yet
     * - null      → not authenticated
     * - object    → authenticated user
     */
    userData: undefined,

    /**
     * Fetch user data using the stored token
     * Called on app load (VerifyAuth)
     */
    getUserData: async () => {
        const userToken = localStorage.getItem("userToken")

        // No token → user is not authenticated
        if (!userToken) {
            set({ userData: null })
            return
        }

        try {
            const res = await fetch("http://127.0.0.1:2005/get-user-data", {
                method: "GET",
                headers: {
                    token: userToken,
                },
            })

            // Invalid or expired token
            if (!res.ok) {
                set({ userData: null })
                return
            }

            const data = await res.json()

            // Store authenticated user data
            set({ userData: data.userData })

        } catch (error) {
            // Network or server error
            console.error(error)
            set({ userData: null })
        }
    },

    /**
     * User signup
     * @returns boolean → success or failure
     */
    signup: async (values) => {
        try {
            const res = await fetch("http://127.0.0.1:2005/userSignup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            const data = await res.json()

            // Backend validation errors
            if (!res.ok) {
                set({ errors: Array.isArray(data) ? data : [data] })
                return false
            }

            // Save token on successful signup
            localStorage.setItem("userToken", data.token)

            return true
        } catch (error) {
            console.error(error)
            return false
        }
    },

    /**
     * User login
     * @returns boolean → success or failure
     */
    login: async (values) => {
        try {
            const res = await fetch("http://127.0.0.1:2005/userLogin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            const data = await res.json()

            // Authentication errors (invalid credentials)
            if (!res.ok) {
                set({ errors: Array.isArray(data) ? data : [data] })
                return false
            }

            // Save token on successful login
            localStorage.setItem("userToken", data.token)

            return true
        } catch (error) {
            console.error(error)
            return false
        }
    },

    /**
     * Clear authentication errors
     * Useful when switching pages
     */
    clearErrorsLog: () => {
        set({ errors: [] })
    },

    /**
     * Logout user
     * Clears token and resets user data
     */
    logout: () => {
        localStorage.clear()
        set({ userData: null })
    }
}))

export default authentificationManagement
