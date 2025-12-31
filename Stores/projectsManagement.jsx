import { create } from "zustand"

const projectsManagement = create((set) => ({
    pageData: {
        projectsData: {
            totalProjects: 0,
            totalLateProjects: 0,
            projectsList: {
                projects: [],
                lateProjects: [],
            }
        },
        pagination: {
            page: null,
            totalPages: null,
        }
    },

    getProjects: async (queries) => {
        const userToken = localStorage.getItem("userToken")
        const { page, limit } = queries

        const res = await fetch(`http://127.0.0.1:2005/project/get?page=${page}&limit=${limit}`, {
            headers: {
                "Content-Type": "application/json",
                token: userToken,
            },
        })

        const data = await res.json()

        if (!data) return

        const upcoming = data.projects.filter((project) => {
            if (!project.deadline || project.status === "completed") return false
            const deadline = new Date(project.deadline)
            const today = new Date()
            const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))
            return diffDays <= 7 && diffDays > 0
        })

        set({
            pageData: {
                projectsData: {
                    totalProjects: data.projects.length,
                    totalLateProjects: upcoming.length,
                    projectsList: {
                        projects: data.projects,
                        lateProjects: upcoming,
                    }
                },
                pagination: {
                    page: page,
                    totalPages: data.pagination.totalPages,
                }
            },
        })
    },
}))

export default projectsManagement