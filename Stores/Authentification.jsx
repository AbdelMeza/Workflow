import { create } from "zustand";

const authentificationManagement = create((set) => ({
    isValid: false,
    errors: [],
    userData: undefined,

    getUserData: async () => {
        const userToken = localStorage.getItem("userToken")

        if (!userToken) {
            set({ userData: null })
            return
        }

        try {
            const res = await fetch("http://127.0.0.1:2005/get-user-data", {
                method: "GET",
                headers: { token: userToken },
            })

            if (res.status !== 200) {
                set({ userData: null })
                return
            }

            const data = await res.json()

            set({ userData: data.userData })
        } catch (error) {
            set({ userData: null })
            console.log(error)
        }
    },

    signup: async (values) => {
        try {
            const res = await fetch("http://127.0.0.1:2005/userSignup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            const data = await res.json()

            if (res?.status !== 201) {
                set({ errors: Array.isArray(data) ? data : [data] })
                return
            }

            localStorage.setItem("userToken", data.token)
            set({ isValid: true })
        } catch (error) {
            console.log(error)
        }
    },

    login: async (values) => {
        try {
            const res = await fetch("http://127.0.0.1:2005/userLogin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            const data = await res.json()

            if (res.status !== 200) {
                set({ errors: Array.isArray(data) ? data : [data] })
                return
            }

            localStorage.setItem("userToken", data.token)

            set({ isValid: true })
        } catch (error) {
            console.log(error)
        }
    },

    clearErrorsLog: () => {
        set({ errors: [] })
    }
}))

export default authentificationManagement