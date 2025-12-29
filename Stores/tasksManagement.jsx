import { create } from "zustand";

const tasksManagement = create((set) => ({
    tasks: [],
    lateTasks: [],
    totalTasks: 0,
    totalLateTasks: 0,

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
        
        const upcoming = data.filter((project) => {
            if (!project.deadline || project.status === "completed") return false
            const deadline = new Date(project.deadline)
            const today = new Date()
            const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))
            return diffDays <= 7 && diffDays > 0
        })

        set({ lateTasks: upcoming })
        set({ totalLateTasks: upcoming.lenght })
    }
}))

export default tasksManagement