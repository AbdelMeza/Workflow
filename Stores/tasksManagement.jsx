import { create } from "zustand";

const tasksManagement = create((set) => ({
    tasks: [],
    totalTasks: 0,

    getTasks: async () => {
        const userToken = localStorage.getItem("userToken")

        const res = await fetch("http://127.0.0.1:2005/task/all", {
            headers: {
                token: userToken,
                "Content-Type": "application/json",
            },
        })

        const data = await res.json()

        if (!data) return

        set({ tasks: data })
        set({ totalTasks: data.length })
    }
}))

export default tasksManagement