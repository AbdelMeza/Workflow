import { create } from "zustand";

const clientAffilationManagement = create((set, get) => ({
    affiliateClientIsOpen: false,
    searchResult: null,
    loadingState: false,
    searchLoading: false,
    selectedClient: null,

    selectClient: (client) => set({ selectedClient: client }),
    toggleAffiliateClient: () => set({ affiliateClientIsOpen: !get().affiliateClientIsOpen, searchResult: null }),

    affiliateClient: async ({ projectId, userId }) => {
        const values = {
            projectTargeted: projectId,
            userId,
            clientId: get().selectedClient.id
        }

        const userToken = localStorage.getItem("userToken")

        try {
            if (!values) return

            set({ loadingState: true })

            await fetch("http://127.0.0.1:2005/user/affiliate", {
                method: "POST",
                headers: {
                    token: userToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })

            set({ loadingState: false })
        } catch (error) {
            console.log(error)
        }
    }
}))

export default clientAffilationManagement