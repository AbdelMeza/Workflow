import { create } from "zustand"
import { getTimeRemaining } from "../utils/TimeRemaining/getTimeRemaining"

// Zustand store for managing projects state and actions
const projectsManagement = create((set) => ({
    // Controls the visibility of the project creation form
    projectFormIsOpen: false,

    // Global data used by the projects page
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

            // Check each project deadline and mark it as "late" if deadline is approaching
            data.projectsData.projects.map(project => {
                getTimeRemaining(project.deadline) && project.status !== "completed"
                    ? project.status = "late"
                    : project.status
            })

            // Sort projects: late projects first
            data.projectsData.projects.sort((a, b) => {
                if (a.status === "late" && b.status !== "late") return -1
                if (a.status !== "late" && b.status === "late") return 1
                return 0
            })

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
            return data
        } catch (error) {
            console.error("Error creating project:", error)
        }
    }
}))

export default projectsManagement
