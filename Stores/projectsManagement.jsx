import { create } from "zustand"

const projectsManagement = create((set, get) => ({
    loadingState: false,

    projectsData: {
        data: {
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
    projectStatus: null,

    /**
     * Fetch projects from the backend with pagination
     * @param {Object} queries - Query parameters (page, limit)
     */
    getProjects: async (queries) => {
        // Retrieve user authentication token from localStorage
        const userToken = localStorage.getItem("userToken")
        const { page, limit, filter, time } = queries

        try {
            set({ loadingState: true })
            // Request projects data from the API
            const res = await fetch(
                `http://127.0.0.1:2005/project/get?page=${page}&limit=${limit}&filter=${filter}&time=${time || "newest"}`,
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
                projectsData: {
                    data: {
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

    getProjectStatus: async () => {
        const userToken = localStorage.getItem("userToken")
        try {
            const res = await fetch(`http://127.0.0.1:2005/data/project_status`, {
                headers: {
                    "Content-Type": "application/json",
                    token: userToken,
                },
            })

            const data = await res.json()
            console.log(data)
            if (!data) return

            set({ projectStatus: data })
        } catch (error) {
            console.error("Error fetching project status:", error)
        }
    },

    syncProjects: ({ action, project, currentPage, limit }) => {

        const state = get()

        const { projects, lateProjects } =
            state.projectsData.data.projectsList

        const isLate = (p) => p.status === "late"

        const existsInProjects =
            projects.some(p => p._id === project._id)

        const existsInLate =
            lateProjects.some(p => p._id === project._id)

        // ========= DELETE =========

        if (action === "delete") {

            const isLastInPage = projects.length === 1

            if (isLastInPage && currentPage > 1) {
                return { refetchPreviousPage: true }
            }

            set({
                projectsData: {
                    ...state.projectsData,
                    data: {
                        ...state.projectsData.data,
                        totalProjects:
                            state.projectsData.data.totalProjects - 1,

                        totalLateProjects:
                            existsInLate
                                ? state.projectsData.data.totalLateProjects - 1
                                : state.projectsData.data.totalLateProjects,

                        estimatedRevenue:
                            existsInProjects
                                ? state.projectsData.data.estimatedRevenue - (project.budget || 0)
                                : state.projectsData.data.estimatedRevenue,

                        projectsList: {
                            projects: projects.filter(p => p._id !== project._id),
                            lateProjects: lateProjects.filter(p => p._id !== project._id),
                        }
                    }
                }
            })

            return
        }

        // ========= UPDATE / ADD =========

        if (action === "update") {

            if (!existsInProjects && currentPage !== 1) {
                return { refetchCurrentPage: true }
            }

            const late = isLate(project)

            const newProjects = existsInProjects
                ? projects.map(p =>
                    p._id === project._id ? { ...p, ...project } : p
                )
                : [project, ...projects].slice(0, limit)

            let newLateProjects = [...lateProjects]

            if (late && !existsInLate)
                newLateProjects.unshift(project)

            if (late && existsInLate)
                newLateProjects =
                    lateProjects.map(p =>
                        p._id === project._id ? { ...p, ...project } : p
                    )

            if (!late && existsInLate)
                newLateProjects =
                    lateProjects.filter(p => p._id !== project._id)

            set({
                projectsData: {
                    ...state.projectsData,
                    data: {
                        ...state.projectsData.data,
                        totalProjects:
                            existsInProjects
                                ? state.projectsData.data.totalProjects
                                : state.projectsData.data.totalProjects + 1,

                        totalLateProjects:
                            !existsInLate && late
                                ? state.projectsData.data.totalLateProjects + 1
                                : existsInLate && !late
                                    ? state.projectsData.data.totalLateProjects - 1
                                    : state.projectsData.data.totalLateProjects,

                        estimatedRevenue:
                            existsInProjects
                                ? state.projectsData.data.estimatedRevenue
                                : state.projectsData.data.estimatedRevenue + (project.budget || 0),

                        projectsList: {
                            projects: newProjects,
                            lateProjects: newLateProjects,
                        }
                    }
                }
            })

            return
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