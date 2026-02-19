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

    syncProjects: ({ action, project, currentPage = 1, limit = 5 }) => {
        const isLate = (p) => p.status === "late";

        const state = projectsManagement.getState();

        const { projects, lateProjects } = state.projectsData.data.projectsList;

        const existsInProjects = projects.some(p => p._id === project._id);
        const existsInLate = lateProjects.some(p => p._id === project._id);

        // DELETE
        if (action === "delete") {
            const isLastInPage = state.projectsData.data.projectsList.projects.length === 1;

            if (isLastInPage) {
                return { refetchPreviousPage: true }
            }

            projectsManagement.setState({
                projectsData: {
                    ...state.projectsData,
                    data: {
                        ...state.projectsData.data,
                        totalProjects: state.projectsData.data.totalProjects - (existsInProjects ? 1 : 0),
                        totalLateProjects: state.projectsData.data.totalLateProjects - (existsInLate ? 1 : 0),
                        estimatedRevenue: state.projectsData.data.estimatedRevenue - (existsInProjects ? (project.budget || 0) : 0),
                        projectsList: {
                            projects: projects.filter(p => p._id !== project._id),
                            lateProjects: lateProjects.filter(p => p._id !== project._id),
                        }
                    },
                    pagination: {
                        ...state.projectsData.pagination,
                        totalPages: Math.ceil((state.projectsData.data.totalProjects - 1) / limit) || 1,
                    }
                }
            });

            return;
        }

        // UPDATE / ADD
        if (action === "update") {
            const late = isLate(project);

            if (!existsInProjects && currentPage !== 1) {
                // Refetch la page actuelle si on est pas sur la première
                setTimeout(() => projectsManagement.getState().getProjects({ page: currentPage, limit }), 0);
                return;
            }

            let newProjects = existsInProjects
                ? projects.map(p => p._id === project._id ? { ...p, ...project } : p)
                : [project, ...projects].slice(0, limit);

            let newLateProjects = existsInLate
                ? lateProjects.map(p => p._id === project._id ? { ...p, ...project } : p)
                : late ? [project, ...lateProjects] : lateProjects;

            const totalProjects = existsInProjects ? state.projectsData.data.totalProjects : state.projectsData.data.totalProjects + 1;
            const totalLateProjects = !existsInLate && late ? state.projectsData.data.totalLateProjects + 1
                : existsInLate && !late ? state.projectsData.data.totalLateProjects - 1
                    : state.projectsData.data.totalLateProjects;

            const estimatedRevenue = existsInProjects
                ? state.projectsData.data.estimatedRevenue
                : state.projectsData.data.estimatedRevenue + (project.budget || 0);

            projectsManagement.setState({
                projectsData: {
                    data: {
                        ...state.projectsData.data,
                        totalProjects,
                        totalLateProjects,
                        estimatedRevenue,
                        projectsList: {
                            projects: newProjects,
                            lateProjects: newLateProjects,
                        }
                    },
                    pagination: {
                        ...state.projectsData.pagination,
                        totalPages: Math.ceil(totalProjects / limit) || 1,
                    }
                }
            });
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