import { create } from "zustand"

const projectsManagement = create((set) => ({
    projectFormIsOpen: false,
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
      * Toggle the project creation form visibility
     */
    openProjectForm: () => set((state) => ({ projectFormIsOpen: !state.projectFormIsOpen })),

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