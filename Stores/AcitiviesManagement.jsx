import { create } from "zustand"

const activitesManagement = create((set) => ({
    activities: [],

    getActivities: async () => {
        const userToken = localStorage.getItem("userToken")

        try {
            const res = await fetch(`http://127.0.0.1:2005/activities/get`, {
                headers: {
                    "Content-Type": "application/json",
                    token: userToken,
                },
            })

            const data = await res.json()

            set({ activities: data.slice(0, 5) })
        } catch (error) {
            console.log(error)
        }
    },

    syncActivities: (incomingActivity) => {
        set((state) => {
            const activities = state.activities || [] // <== ici on prend "activities"

            const exists = activities.some(a => a._id === incomingActivity._id)

            const newActivities = exists
                ? activities.map(a =>
                    a._id === incomingActivity._id ? { ...a, ...incomingActivity } : a
                )
                : [incomingActivity, ...activities]

            return { activities: newActivities.slice(0, 5) } // <== mettre à jour "activities"
        })
    }


}))

export default activitesManagement