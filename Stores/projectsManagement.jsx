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

    syncProjects: ({ action, project }) => {
        const isLate = (p) => p.status === "late"
    
        set((state) => {
            const {
                projects,
                lateProjects,
            } = state.pageData.projectsData.projectsList
    
            let newProjects = [...projects]
            let newLateProjects = [...lateProjects]
    
            const existsInProjects = projects.some(p => p._id === project._id)
            const existsInLate = lateProjects.some(p => p._id === project._id)
    
            // ================================
            // DELETE
            // ================================
            if (action === "delete") {
                newProjects = projects.filter(p => p._id !== project._id)
                newLateProjects = lateProjects.filter(p => p._id !== project._id)
            }
    
            // ================================
            // UPDATE / ADD
            // ================================
            if (action === "update") {
                const late = isLate(project)
    
                // ---- projects ----
                if (existsInProjects) {
                    newProjects = projects.map(p =>
                        p._id === project._id ? { ...p, ...project } : p
                    )
                } else {
                    newProjects = [project, ...projects]
                }
    
                // ---- late projects ----
                if (late && !existsInLate) {
                    newLateProjects = [project, ...lateProjects]
                }
    
                if (late && existsInLate) {
                    newLateProjects = lateProjects.map(p =>
                        p._id === project._id ? { ...p, ...project } : p
                    )
                }
    
                if (!late && existsInLate) {
                    newLateProjects = lateProjects.filter(
                        p => p._id !== project._id
                    )
                }
            }
    
            // ================================
            // COUNTERS (toujours recalculés proprement)
            // ================================
            const totalProjects = newProjects.length
            const totalLateProjects = newLateProjects.length
            const estimatedRevenue = newProjects.reduce(
                (sum, p) => sum + (p.budget || 0),
                0
            )
    
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
    },

    deleteProject: async (projectId) => {
        const userToken = localStorage.getItem("userToken")

        try {
            const res = await fetch(`http://127.0.0.1:2005/project/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: userToken,
                },
                body: JSON.stringify({ id: projectId }), 
            })

            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

}))

export default projectsManagement