import { create } from "zustand";

const authentificationManagement = create((set, get) => ({
    isValid: false,
    errors: [],

    signup: async (values) => {
        try {
            const req = await fetch("http://127.0.0.1:2005/userSignup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })
            
            const response = await req.json()

            if (response.status !== 201) {
                set({ errors: Array.isArray(response) ? response : [response] })
                return
            }

            set({ isValid: true })
        } catch (error) {
            console.log(error)
        }
    },

    login: async (values) => {
        try {
            const req = await fetch("http://127.0.0.1:2005/userLogin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            const response = await req.json()

            if (response.status !== 201) {
                set({ errors: Array.isArray(response) ? response : [response] })
                return
            }

            set({ isValid: true })
        } catch (error) {
            console.log(error)
        }
    },
}))

export default authentificationManagement