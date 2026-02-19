import { create } from "zustand"

const activitesManagement = create((set) => ({
    activitiesData: {
        data: {
            activities: [],
        },
        pagination: {
            page: null,
            totalPages: null,
        },
    },
    loadingState: false,

    getActivities: async (queries) => {
        const userToken = localStorage.getItem("userToken")
        const { filter, page, limit } = queries

        try {
            set({ loadingState: true })
            const res = await fetch(`http://127.0.0.1:2005/activities/get?filter=${filter}&page=${page}&limit=${limit}`, {
                headers: {
                    "Content-Type": "application/json",
                    token: userToken,
                },
            })

            const data = await res.json()
            set({
                activitiesData: {
                    data: {
                        activities: data.activities || []
                    },
                    pagination: data.pagination || {}
                }
            })
        } catch (error) {
            console.log(error)
        } finally {
            set({ loadingState: false })
        }
    },

    syncActivities: (incomingActivity) => {
        set((state) => {
            const activities = state.activitiesData.data.activities || []

            const exists = activities.some(a => a._id === incomingActivity._id)

            const newActivities = exists
                ? activities.map(a =>
                    a._id === incomingActivity._id ? { ...a, ...incomingActivity } : a
                )
                : [incomingActivity, ...activities]

            return {
                activitiesData:
                {
                    ...state.activitiesData,
                    data: {
                        ...state.activitiesData.data,
                        activities: newActivities
                    }
                }
            }
        })
    }


}))

export default activitesManagement