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

        try {
            const res = await fetch(`http://127.0.0.1:2005/project/get?page=${page}&limit=${limit}`, {
                headers: {
                    "Content-Type": "application/json",
                    token: userToken,
                },
            })

            const data = await res.json()
            if (!data) return

            console.log(data)

            set({
                pageData: {
                    projectsData: {
                        totalProjects: data.projectsData.totalProjects,
                        totalLateProjects: data.projectsData.totalLateProjects,
                        projectsList: {
                            projects: data.projectsData.projects,
                            lateProjects: data.projectsData.lateProjects
                        }
                    },
                    pagination: {
                        page: data.pagination.page,
                        totalPages: data.pagination.totalPages,
                        hasNextPage: data.pagination.hasNextPage,
                        hasPrevPage: data.pagination.hasPrevPage
                    }
                },
            })
        } catch (error) {
            console.error("Error fetching projects:", error)
        }
    },
}))

export default projectsManagement
