import { create } from "zustand"

const projectsManagement = create((set, get) => ({
    projects: [],
    lateProjects: [],
    totalProjects: 0,
    totalLateProjects: 0,

    getProjects: async () => {
        const userToken = localStorage.getItem("userToken")

        const res = await fetch("http://127.0.0.1:2005/project/all", {
            headers: {
                token: userToken,
                "Content-Type": "application/json",
            },
        })

        const data = await res.json()

        if (!data) return
        set({ projects: data })
        set({ totalProjects: data.length })

        const upcoming = data.filter((project) => {
            if (!project.deadline || project.status === "completed") return false
            const deadline = new Date(project.deadline)
            const today = new Date()
            const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))
            return diffDays <= 7 && diffDays >= 0
        })

        set({ lateProjects: upcoming })
        set({ totalLateProjects: get().lateProjects.length })
    },
}))

export default projectsManagement