import { create } from "zustand"

const projectsManagement = create((set) => ({
    loadingState: false,

    pageData: {
        projectsData: {
            totalProjects: 0,
            totalLateProjects: 0,
            totalProjectsCompleted: 0,
            estimatedRevenue: 0,
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

    /**
     * Fetch projects from the backend with pagination
     * @param {Object} queries - Query parameters (page, limit)
     */
    getProjects: async (queries) => {
        // Retrieve user authentication token from localStorage
        const userToken = localStorage.getItem("userToken")
        const { page, limit } = queries

        try {
            set({ loadingState: true })
            // Request projects data from the API
            const res = await fetch(
                `http://127.0.0.1:2005/project/get?page=${page}&limit=${limit}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        token: userToken,
                    },
                }
            )

            const data = await res.json()
            if (!data) return

            // Update the Zustand store with fetched data
            set({
                pageData: {
                    projectsData: {
                        totalProjects: data.projectsData.totalProjects,
                        totalLateProjects: data.projectsData.totalLateProjects,
                        totalProjectsCompleted: data.projectsData.totalProjectsCompleted,
                        estimatedRevenue: data.projectsData.estimatedRevenue,
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
        } finally {
            set({ loadingState: false })
        }
    },

    updateData: (incomingProject) => {
        const isLate = (project) => project.status === "late"

        set((state) => {
            const {
                projects,
                lateProjects,
            } = state.pageData.projectsData.projectsList

            const existsInProjects = projects.some(p => p._id === incomingProject._id)
            const existsInLate = lateProjects.some(p => p._id === incomingProject._id)
            const late = isLate(incomingProject)

            // ---------- PROJECTS ----------
            const newProjects = existsInProjects
                ? projects.map(p =>
                    p._id === incomingProject._id ? { ...p, ...incomingProject } : p
                )
                : [incomingProject, ...projects]

            // ---------- LATE PROJECTS ----------
            let newLateProjects = lateProjects

            // add to late
            if (late && !existsInLate) {
                newLateProjects = [incomingProject, ...lateProjects]
            }

            // update late
            if (late && existsInLate) {
                newLateProjects = lateProjects.map(p =>
                    p._id === incomingProject._id ? { ...p, ...incomingProject } : p
                )
            }

            // remove from late
            if (!late && existsInLate) {
                newLateProjects = lateProjects.filter(
                    p => p._id !== incomingProject._id
                )
            }

            // ---------- COUNTERS ----------
            const totalProjects =
                state.pageData.projectsData.totalProjects + (existsInProjects ? 0 : 1)

            const totalLateProjects = newLateProjects.length

            const estimatedRevenue =
                state.pageData.projectsData.estimatedRevenue +
                (!existsInProjects ? incomingProject.budget || 0 : 0)

            return {
                pageData: {
                    ...state.pageData,
                    projectsData: {
                        ...state.pageData.projectsData,
                        totalProjects,
                        totalLateProjects,
                        estimatedRevenue,
                        projectsList: {
                            projects: newProjects,
                            lateProjects: newLateProjects,
                        },
                    },
                },
            }
        })
    },

    /**
     * Create a new project
     * @param {Object} projectData - Data of the project to create
     * @returns {Object} API response
     */
    createProject: async (projectData) => {
        // Retrieve user authentication token
        const userToken = localStorage.getItem("userToken")

        try {
            set({ loadingState: true })
            // Send project data to the backend
            const res = await fetch(`http://127.0.0.1:2005/project/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: userToken,
                },
                body: JSON.stringify(projectData),
            })

            const data = await res.json()
            set({ loadingState: false })
            return data
        } catch (error) {
            console.error("Error creating project:", error)
        }
    }
}))

export default projectsManagement